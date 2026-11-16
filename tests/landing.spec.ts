import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const checkout = "https://pay.kiwify.com.br/9AVIr7g";

test("conteúdo, links, responsividade e FAQ", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Pronúncia em Inglês.*Saga Eloquência/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(".topic")).toHaveCount(6);
  await expect(page.locator(".time-stamp")).toHaveCount(0);
  await expect(page.locator(".hero-description")).toContainText(
    "aproximadamente 30 minutos",
  );
  expect(
    await page
      .locator(".course-cover")
      .evaluate(
        (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
      ),
  ).toBe(true);
  await expect(page.locator("meta[name='description']")).toHaveAttribute(
    "content",
    /30 minutos/,
  );
  const purchaseLinks = page.locator("a[data-checkout]");
  await expect(purchaseLinks).toHaveCount(4);
  for (const link of await purchaseLinks.all()) {
    await expect(link).toHaveAttribute("href", checkout);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await expect(
    page.getByRole("link", { name: "Instagram", exact: false }),
  ).toHaveAttribute("href", "https://www.instagram.com/teacherleohermes/");
  await expect(
    page.getByRole("link", { name: "WhatsApp", exact: false }),
  ).toHaveAttribute(
    "href",
    "https://api.whatsapp.com/send/?phone=5547988315587&text&type=phone_number&app_absent=0",
  );
  await expect(
    page.getByRole("link", { name: "E-mail", exact: true }),
  ).toHaveAttribute("href", "mailto:leonardo@sagaeloquencia.com");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  const layout = await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
    documentHeight: document.documentElement.scrollHeight,
    scrollWidth: document.documentElement.scrollWidth,
    folds: document.documentElement.scrollHeight / window.innerHeight,
  }));
  await testInfo.attach("layout", {
    body: JSON.stringify(layout, null, 2),
    contentType: "application/json",
  });
  console.log(`[${testInfo.project.name}] ${JSON.stringify(layout)}`);
  if (testInfo.project.name === "desktop-1440") {
    const heroCta = await page
      .getByRole("link", { name: /Quero melhorar minha pronúncia/ })
      .boundingBox();
    expect(heroCta && heroCta.y + heroCta.height).toBeLessThan(
      page.viewportSize()!.height,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollHeight / window.innerHeight,
      ),
    ).toBeLessThanOrEqual(4);
  }
  const portrait = page.locator(".instructor-photo");
  await portrait.scrollIntoViewIfNeeded();
  await expect
    .poll(
      () =>
        portrait.evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
      { timeout: 20000 },
    )
    .toBe(true);
  const question = page.getByText("Como é o formato do curso?", {
    exact: true,
  });
  await question.click();
  await expect(
    page.getByText(/O curso é online e gravado, organizado/),
  ).toBeVisible();
  await question.press("Enter");
  await expect(page.locator("details").first()).not.toHaveAttribute("open");
  await page
    .getByText("Como acesso a aula depois da compra?", { exact: true })
    .click();
  await expect(
    page.getByText(/Após a confirmação da compra, o conteúdo/),
  ).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("CTA abre o destino de compra em nova aba", async ({ page, context }) => {
  // Interceptar o destino valida a navegação sem realizar uma compra ou depender do serviço externo.
  await context.route(checkout, (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<title>Checkout validado</title>",
    }),
  );
  await page.goto("/");
  const popupPromise = page.waitForEvent("popup");
  await page
    .getByRole("link", { name: /Quero melhorar minha pronúncia/ })
    .click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(checkout);
  await expect(popup).toHaveTitle("Checkout validado");
  expect(await popup.evaluate(() => window.opener === null)).toBe(true);
});

test("acessibilidade WCAG AA e navegação por teclado", async ({ page }) => {
  // Auditar a apresentação estável, sem capturar cores intermediárias do fade.
  // As animações normais e sua limpeza são verificadas no teste de hover/fontes.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
});

test("movimento reduzido e conteúdo disponível sem JavaScript", async ({
  page,
  browser,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator(".hero-enter")
      .first()
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  expect(
    await page
      .locator("html")
      .evaluate((element) => getComputedStyle(element).scrollBehavior),
  ).toBe("auto");
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: page.viewportSize()!,
  });
  const staticPage = await context.newPage();
  await staticPage.goto("http://127.0.0.1:3000/");
  await expect(staticPage.locator("h1")).toBeVisible();
  await staticPage.locator(".topic").last().scrollIntoViewIfNeeded();
  await expect(staticPage.locator(".topic").last()).toBeVisible();
  await staticPage
    .getByText("Como é o formato do curso?", { exact: true })
    .click();
  await expect(
    staticPage.getByText(/O curso é online e gravado, organizado/),
  ).toBeVisible();
  await context.close();
});

test("fontes locais, nitidez em repouso e hover dos tópicos", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".topic svg")).toHaveCount(0);
  await expect(page.locator(".instructor-monogram")).toHaveCount(0);
  const photo = page.locator(".instructor-photo");
  await expect(photo).toHaveAttribute("alt", /Leonardo Hermes/);
  await expect(photo).toHaveAttribute("loading", "lazy");
  await photo.scrollIntoViewIfNeeded();
  await expect
    .poll(
      () =>
        photo.evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
      { timeout: 20000 },
    )
    .toBe(true);
  expect(
    await photo.evaluate((image) => getComputedStyle(image).objectFit),
  ).toBe("cover");
  expect(
    await photo.evaluate((image) => getComputedStyle(image).objectPosition),
  ).toBe("100% 50%");
  await expect
    .poll(() =>
      photo.evaluate((image) => image.parentElement!.getAnimations().length),
    )
    .toBe(0);
  await photo.screenshot({
    path: `test-results/${testInfo.project.name}-portrait.png`,
  });
  const photoBox = await photo.boundingBox();
  // O recorte cover precisa de mais pixels do que a largura externa do bloco.
  const selectedPhotoWidth = await photo.evaluate((image: HTMLImageElement) =>
    Number(new URL(image.currentSrc).searchParams.get("w")),
  );
  expect(selectedPhotoWidth).toBeGreaterThanOrEqual(
    photoBox!.height * (2688 / 1520),
  );
  const copyBox = await page.locator(".instructor-copy").boundingBox();
  if (page.viewportSize()!.width > 600) {
    expect(photoBox!.x + photoBox!.width).toBeLessThan(copyBox!.x);
  } else {
    expect(photoBox!.y + photoBox!.height).toBeLessThan(copyBox!.y);
  }

  for (const [selector, name] of [
    ["h1", "manrope"],
    ["body", "inter"],
    ["h1 em", "lora"],
  ]) {
    const family = await page
      .locator(selector)
      .evaluate((element) => getComputedStyle(element).fontFamily);
    expect(family.toLowerCase()).toContain(name);
    expect(
      await page.locator(selector).evaluate((element) => {
        const style = getComputedStyle(element);
        return document.fonts.check(
          `${style.fontStyle} ${style.fontWeight} 24px ${style.fontFamily.split(",")[0]}`,
        );
      }),
    ).toBe(true);
  }

  const topic = page.locator(".topic").first();
  await topic.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect
    .poll(() =>
      topic.evaluate(
        (element) => element.parentElement!.getAnimations().length,
      ),
    )
    .toBe(0);
  await expect
    .poll(() =>
      topic.evaluate((element) => getComputedStyle(element).transform),
    )
    .toBe("none");
  expect(
    await topic.evaluate((element) => getComputedStyle(element).filter),
  ).toBe("none");
  expect(
    await topic
      .locator("p")
      .evaluate((element) => getComputedStyle(element).textShadow),
  ).toBe("none");

  await topic.hover();
  await expect
    .poll(() =>
      topic.evaluate((element) => getComputedStyle(element).transform),
    )
    .toBe("matrix(1, 0, 0, 1, 0, -4)");
  if (testInfo.project.name === "desktop-1440") {
    await page
      .locator(".curriculum")
      .screenshot({ path: "test-results/desktop-1440-hover.png" });
  }
  await page.mouse.move(0, 0);
  await expect
    .poll(() =>
      topic.evaluate((element) => getComputedStyle(element).transform),
    )
    .toBe("none");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await topic.hover();
  expect(
    await topic.evaluate((element) => getComputedStyle(element).transform),
  ).toBe("none");
});

test("tópicos legíveis e estáveis em dispositivo de toque", async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    viewport: testInfo.project.use.viewport,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/");
  expect(
    await page.evaluate(
      () => matchMedia("(hover: hover) and (pointer: fine)").matches,
    ),
  ).toBe(false);
  const topic = page.locator(".topic").first();
  await topic.tap();
  expect(
    await topic.evaluate((element) => getComputedStyle(element).transform),
  ).toBe("none");
  expect(
    await topic
      .locator("p")
      .evaluate((element) => parseFloat(getComputedStyle(element).fontSize)),
  ).toBeGreaterThanOrEqual(13);
  // Não ativar efeitos de mouse em dispositivos que só oferecem toque.
  for (const [target, transformed] of [
    [".instructor-portrait", ".instructor-photo"],
    [".cover-hover", ".cover-frame"],
    ["a[data-checkout]", "a[data-checkout]"],
    [".steps li", ".step"],
  ]) {
    await page.locator(target).first().hover();
    expect(
      await page
        .locator(transformed)
        .first()
        .evaluate((element) => getComputedStyle(element).transform),
    ).toBe("none");
  }
  expect(
    await page
      .locator("a[data-checkout] .icon")
      .first()
      .evaluate((element) => getComputedStyle(element).transform),
  ).toBe("none");
  if (await page.locator(".nav-link").isVisible()) {
    await page.locator(".nav-link").hover();
    expect(
      await page
        .locator(".nav-link")
        .evaluate(
          (element) =>
            new DOMMatrix(getComputedStyle(element, "::after").transform).m11,
        ),
    ).toBe(0);
  }
  await context.close();
});

test("microinterações de imagens, compra e navegação sem alterar o layout", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const cover = page.locator(".cover-frame");
  const photo = page.locator(".instructor-photo");
  const portrait = page.locator(".instructor-portrait");
  const originalLayout = await page
    .locator(".hero-shell")
    .evaluate((element) => ({
      width: element.scrollWidth,
      height: element.scrollHeight,
    }));
  const layoutBox = () =>
    portrait.evaluate((element: HTMLElement) => ({
      width: element.offsetWidth,
      height: element.offsetHeight,
    }));
  const originalPhotoBox = await layoutBox();
  const matrix = (selector: string) =>
    page.locator(selector).evaluate((element) => {
      const value = new DOMMatrix(getComputedStyle(element).transform);
      return {
        x: value.m41,
        y: value.m42,
        scale: value.m11,
        angle: Math.abs((Math.atan2(value.m13, value.m11) * 180) / Math.PI),
      };
    });

  await portrait.hover();
  await expect
    .poll(async () => (await matrix(".instructor-photo")).scale)
    .toBeCloseTo(1.035, 4);
  expect(await layoutBox()).toEqual(originalPhotoBox);
  expect(
    await portrait.evaluate((element) => getComputedStyle(element).overflow),
  ).toBe("hidden");
  expect(
    await photo.evaluate((element) => getComputedStyle(element).filter),
  ).toBe("none");
  expect(
    await portrait.evaluate((element) => getComputedStyle(element).boxShadow),
  ).not.toBe("none");
  expect(await portrait.locator("a, button").count()).toBe(0);
  if (testInfo.project.name === "desktop-1440") {
    await page
      .locator(".instructor-section")
      .screenshot({ path: "test-results/hover-foto.png" });
  }
  await page.mouse.move(0, 0);
  await expect
    .poll(() =>
      photo.evaluate((element) => getComputedStyle(element).transform),
    )
    .toBe("none");

  await page.locator(".cover-hover").hover();
  await expect
    .poll(async () => (await matrix(".cover-frame")).y)
    .toBeCloseTo(-6, 3);
  await expect
    .poll(async () => (await matrix(".cover-frame")).angle)
    .toBeCloseTo(2, 3);
  expect(
    await cover.evaluate((element) => getComputedStyle(element).boxShadow),
  ).not.toBe("none");
  await expect(cover.locator(".time-stamp")).toHaveCount(0);
  expect(await cover.locator("a, button").count()).toBe(0);
  if (testInfo.project.name === "desktop-1440") {
    await page.screenshot({ path: "test-results/hover-capa.png" });
  }
  await page.mouse.move(0, 0);
  await expect
    .poll(() =>
      cover.evaluate((element) => getComputedStyle(element).transform),
    )
    .toBe("none");

  for (const button of await page.locator("a[data-checkout]").all()) {
    const originalColor = await button.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    );
    await button.hover();
    await expect
      .poll(() =>
        button.evaluate(
          (element) => new DOMMatrix(getComputedStyle(element).transform).m42,
        ),
      )
      .toBe(-2);
    await expect
      .poll(() =>
        button
          .locator(".icon")
          .evaluate(
            (element) => new DOMMatrix(getComputedStyle(element).transform).m41,
          ),
      )
      .toBe(4);
    expect(
      await button.evaluate(
        (element) => getComputedStyle(element).backgroundColor,
      ),
    ).not.toBe(originalColor);
    await page.mouse.move(0, 0);
    await expect
      .poll(() =>
        button.evaluate((element) => getComputedStyle(element).transform),
      )
      .toBe("none");
    await expect
      .poll(() =>
        button
          .locator(".icon")
          .evaluate((element) => getComputedStyle(element).transform),
      )
      .toBe("none");
  }
  const link = page.locator(".nav-link");
  if (await link.isVisible()) {
    await link.hover();
    await expect
      .poll(() =>
        link.evaluate(
          (element) =>
            new DOMMatrix(getComputedStyle(element, "::after").transform).m11,
        ),
      )
      .toBe(1);
    await page.mouse.move(0, 0);
    await expect
      .poll(() =>
        link.evaluate(
          (element) =>
            new DOMMatrix(getComputedStyle(element, "::after").transform).m11,
        ),
      )
      .toBe(0);
    await page.keyboard.press("Tab");
    await link.focus();
    await expect
      .poll(() =>
        link.evaluate(
          (element) =>
            new DOMMatrix(getComputedStyle(element, "::after").transform).m11,
        ),
      )
      .toBe(1);
    expect(
      await link.evaluate((element) => getComputedStyle(element).outlineStyle),
    ).not.toBe("none");
  }
  expect(
    await page.locator(".hero-shell").evaluate((element) => ({
      width: element.scrollWidth,
      height: element.scrollHeight,
    })),
  ).toEqual(originalLayout);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("movimento reduzido elimina zoom, elevação e inclinação das microinterações", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const [target, transformed] of [
    [".instructor-portrait", ".instructor-photo"],
    [".cover-hover", ".cover-frame"],
    ["a[data-checkout]", "a[data-checkout]"],
    [".steps li", ".step"],
  ]) {
    await page.locator(target).first().hover();
    expect(
      await page
        .locator(transformed)
        .first()
        .evaluate((element) => getComputedStyle(element).transform),
    ).toBe("none");
    expect(
      await page
        .locator(transformed)
        .first()
        .evaluate((element) => getComputedStyle(element).transitionDuration),
    ).toBe("0s");
  }
  expect(
    await page
      .locator("a[data-checkout] .icon")
      .first()
      .evaluate((element) => getComputedStyle(element).transform),
  ).toBe("none");
});

test("passos com entrada sequencial única e hover sem mudança de layout", async ({
  page,
}, testInfo) => {
  await page.addInitScript(() => {
    const originalAnimate = Element.prototype.animate;
    const events: {
      delay: number;
      duration: number;
      opacity: string;
      transform: string;
    }[] = [];
    Object.defineProperty(window, "stepEntranceEvents", { value: events });
    Element.prototype.animate = function (
      this: Element,
      keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
      options?: number | KeyframeAnimationOptions,
    ) {
      const animation = originalAnimate.call(this, keyframes, options);
      if (this.matches(".steps > li")) {
        const timing = animation.effect!.getTiming();
        const first = (animation.effect as KeyframeEffect).getKeyframes()[0];
        events.push({
          delay: timing.delay ?? 0,
          duration: Number(timing.duration),
          opacity: String(first.opacity),
          transform: String(first.transform),
        });
      }
      return animation;
    };
  });
  const entrances = () =>
    page.evaluate(
      () =>
        (
          window as unknown as {
            stepEntranceEvents: {
              delay: number;
              duration: number;
              opacity: string;
              transform: string;
            }[];
          }
        ).stepEntranceEvents,
    );
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(await entrances()).toEqual([]);
  const steps = page.locator(".steps");
  await expect(steps.getByRole("listitem")).toHaveCount(3);
  await expect(steps.locator("a, button, [tabindex]")).toHaveCount(0);
  await steps.scrollIntoViewIfNeeded();
  await expect.poll(async () => (await entrances()).length).toBe(3);
  const recorded = await entrances();
  expect(recorded.map((entry) => entry.delay)).toEqual([0, 100, 200]);
  expect(
    recorded.every(
      (entry) =>
        entry.duration === 500 &&
        entry.opacity === "0" &&
        entry.transform === "translateY(12px)",
    ),
  ).toBe(true);
  await expect
    .poll(() =>
      steps
        .locator("li")
        .evaluateAll((items) =>
          items.every((item) => item.getAnimations().length === 0),
        ),
    )
    .toBe(true);
  const dimensions = () =>
    steps.evaluate((element: HTMLElement) => ({
      width: element.offsetWidth,
      height: element.offsetHeight,
      documentHeight: document.documentElement.scrollHeight,
    }));
  const initialDimensions = await dimensions();
  for (const item of await steps.locator("li").all()) {
    const content = item.locator(".step");
    const number = content.locator("span").first();
    await item.hover();
    await expect
      .poll(() =>
        content.evaluate(
          (element) => new DOMMatrix(getComputedStyle(element).transform).m42,
        ),
      )
      .toBe(-3);
    await expect
      .poll(() =>
        number.evaluate((element) => getComputedStyle(element).backgroundColor),
      )
      .toBe("rgb(7, 58, 73)");
    await expect
      .poll(() => number.evaluate((element) => getComputedStyle(element).color))
      .toBe("rgb(255, 255, 255)");
    await expect
      .poll(() =>
        content.evaluate(
          (element) => getComputedStyle(element, "::before").opacity,
        ),
      )
      .toBe("1");
    expect(await dimensions()).toEqual(initialDimensions);
    expect(
      await content.evaluate((element) => getComputedStyle(element).boxShadow),
    ).toBe("none");
    if (
      testInfo.project.name === "desktop-1440" &&
      (await number.textContent()) === "02"
    ) {
      await page
        .locator(".instructor-section")
        .screenshot({ path: "test-results/hover-passos.png" });
    }
    await page.mouse.move(0, 0);
    await expect
      .poll(() =>
        content.evaluate((element) => getComputedStyle(element).transform),
      )
      .toBe("none");
    await expect
      .poll(() =>
        number.evaluate((element) => getComputedStyle(element).backgroundColor),
      )
      .toBe("rgba(0, 0, 0, 0)");
    await expect
      .poll(() =>
        content.evaluate(
          (element) => getComputedStyle(element, "::before").opacity,
        ),
      )
      .toBe("0");
  }
  await page.locator("h1").scrollIntoViewIfNeeded();
  await expect(steps).not.toBeInViewport();
  await steps.scrollIntoViewIfNeeded();
  expect((await entrances()).length).toBe(3);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await steps.scrollIntoViewIfNeeded();
  expect(await entrances()).toEqual([]);
  await expect(steps).toBeVisible();
  await steps.locator("li").first().hover();
  expect(
    await steps
      .locator(".step")
      .first()
      .evaluate((element) => getComputedStyle(element).transform),
  ).toBe("none");
});
