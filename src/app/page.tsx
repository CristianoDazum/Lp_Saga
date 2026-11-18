import Image from "next/image";
import { Brand } from "@/components/brand";
import { CheckoutLink } from "@/components/checkout-link";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { Soundwave } from "@/components/soundwave";
import {
  course,
  courseCover,
  instructorPhoto,
  pronunciationExample,
  questions,
  topics,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="hero-shell" id="inicio">
        <header className="site-header container">
          <Brand />
          <nav aria-label="Navegação principal">
            <a className="nav-link" href="#o-curso">
              O curso
            </a>
            <CheckoutLink compact>Quero começar</CheckoutLink>
          </nav>
        </header>
        <main id="conteudo" tabIndex={-1}>
          <section className="hero container" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow hero-enter">
                <span className="tiny-line" /> SEU INGLÊS, COM MAIS CLAREZA
              </p>
              <h1 id="hero-title" className="hero-enter">
                Desenvolva a sua
                <br className="desktop-break" /> pronúncia e
                <br />{" "}
                <span className="hero-highlight">saia do básico</span>
              </h1>
              <p className="hero-description hero-enter">
                Em uma aula gravada de aproximadamente 30 minutos, Leonardo
                Hermes apresenta{" "}
                <strong>6 pontos da pronúncia em inglês</strong> que costumam
                confundir brasileiros.
              </p>
              <div className="hero-purchase hero-enter">
                <CheckoutLink>Quero melhorar minha pronúncia</CheckoutLink>
                <p>
                  <strong>R$ 47,90</strong>
                  <span>Pagamento único. Sem assinatura.</span>
                </p>
              </div>
              <div className="hero-example hero-enter">
                <p className="hero-example-title">
                  {pronunciationExample.title
                    .split(/\b(lai-ki|like)\b/)
                    .map((part, index) =>
                      part === "lai-ki" || part === "like" ? (
                        <span
                          key={index}
                          className={
                            part === "like"
                              ? "hero-example-word"
                              : "hero-example-sound"
                          }
                        >
                          {part}
                        </span>
                      ) : (
                        part
                      ),
                    )}
                </p>
                <p className="hero-example-description">
                  {pronunciationExample.description}
                </p>
              </div>
            </div>
            <div className="hero-visual hero-enter">
              <div className="visual-topline">
                <span>O GUIA DEFINITIVO</span>
                <span>PRONÚNCIA / INGLÊS</span>
              </div>
              <div className="cover-hover">
                <div className="cover-frame">
                  <Image
                    src={courseCover.src}
                    alt={courseCover.alt}
                    width={courseCover.width}
                    height={courseCover.height}
                    sizes="(max-width: 600px) 90vw, (max-width: 1000px) 65vw, 480px"
                    preload
                    className="course-cover"
                  />
                </div>
              </div>
              <div className="visual-caption">
                <span>Da palavra à sua voz.</span>
                <Soundwave />
              </div>
            </div>
          </section>
          <div className="hero-facts">
            <div className="container facts-inner">
              <span>
                <Icon name="play" />
                Uma aula. Seis pontos de pronúncia.
              </span>
              <span>
                <Icon name="clock" />
                Aproximadamente 30 minutos
              </span>
              <span>
                <Icon name="check" />
                Acesso pela Kiwify
              </span>
            </div>
          </div>

          <section
            className="curriculum section-light"
            id="o-curso"
            aria-labelledby="curriculum-title"
          >
            <div className="container">
              <Reveal className="section-heading">
                <div>
                  <p className="eyebrow">01 / O CURSO</p>
                  <h2 id="curriculum-title">
                    Corrija os erros mais comuns do{" "}
                    <span className="curriculum-highlight">nível básico</span>
                  </h2>
                </div>
                <p>
                  Para quem já estudou inglês e quer
                  <br className="desktop-break" /> olhar com mais atenção para a
                  pronúncia.
                </p>
              </Reveal>
              <div className="topics-grid">
                {topics.map((topic, index) => (
                  <Reveal
                    key={topic.id}
                    delay={index * 45}
                    className="topic-reveal"
                  >
                    <article className="topic">
                      <span className="topic-number">0{index + 1}</span>
                      <div>
                        <h3>{topic.title}</h3>
                        <p>{topic.description}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
              <Reveal className="curriculum-cta">
                <CheckoutLink>Quero melhorar minha pronúncia</CheckoutLink>
              </Reveal>
              <Reveal className="curriculum-note">
                <span className="note-dot" />
                <p>
                  Você já conhece o inglês. Agora, dê atenção a como ele soa.
                </p>
              </Reveal>
            </div>
          </section>

          <section
            className="instructor-section"
            aria-labelledby="instructor-title"
          >
            <div className="container instructor-grid">
              <Reveal className="instructor-portrait">
                <Image
                  src={instructorPhoto.src}
                  alt="Leonardo Hermes, professor de inglês e mentor de oratória"
                  fill
                  sizes="(max-width: 600px) 140vw, (max-width: 800px) 60vw, 750px"
                  quality={85}
                  className="instructor-photo"
                  style={{ objectPosition: instructorPhoto.objectPosition }}
                />
              </Reveal>
              <div className="instructor-copy">
                <Reveal>
                  <p className="eyebrow">02 / QUEM VAI GUIAR VOCÊ</p>
                  <h2 id="instructor-title">
                    Conheça
                    <br />
                    <em>Leonardo Hermes.</em>
                  </h2>
                  <p className="instructor-bio">
                    Professor de inglês e mentor de oratória à frente da Saga
                    Eloquência. Os seis pontos abordados neste curso foram
                    selecionados a partir das dificuldades de pronúncia mais
                    recorrentes que Leonardo Hermes identificou em seus alunos
                    ao longo de{" "}
                    <strong>
                      quase 30 anos de experiência ensinando inglês.
                    </strong>
                  </p>
                </Reveal>
                <Reveal stagger={100}>
                  <ol className="steps">
                    <li data-reveal-item>
                      <div className="step">
                        <span>01</span>
                        <p>
                          <strong>Faça sua inscrição</strong>Pagamento único de
                          R$ 47,90 no checkout da Kiwify.
                        </p>
                      </div>
                    </li>
                    <li data-reveal-item>
                      <div className="step">
                        <span>02</span>
                        <p>
                          <strong>Acesse a aula gravada</strong>Conteúdo na área
                          de membros após a confirmação da compra.
                        </p>
                      </div>
                    </li>
                    <li data-reveal-item>
                      <div className="step">
                        <span>03</span>
                        <p>
                          <strong>Reserve cerca de 30 minutos</strong>Uma aula
                          única para olhar com atenção para os sons do inglês.
                        </p>
                      </div>
                    </li>
                  </ol>
                </Reveal>
                <Reveal>
                  <CheckoutLink compact>Quero falar com confiança</CheckoutLink>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="closing-section" aria-labelledby="closing-title">
            <div className="container">
              <Reveal className="closing-offer">
                <p className="eyebrow">O PRÓXIMO PASSO É NA SUA VOZ</p>
                <h2 id="closing-title">
                  Menos dúvidas na pronúncia.
                  <br />
                  <em>Mais segurança para falar inglês.</em>
                </h2>
                <p className="offer-summary">
                  Aula gravada <span>•</span> aprox. 30 min <span>•</span>{" "}
                  <strong>R$ 47,90</strong>
                </p>
                <CheckoutLink>Acesso vitalício por R$ 47,90</CheckoutLink>
                <p className="offer-footnote">
                  Pagamento único. Conteúdo disponível pela Kiwify.
                </p>
              </Reveal>
              <Reveal className="faq">
                <h3>
                  Dúvidas rápidas<span>Antes de dar o próximo passo.</span>
                </h3>
                <div>
                  {questions.map(({ question, answer }) => (
                    <details key={question}>
                      <summary>
                        {question}
                        <span className="faq-plus" aria-hidden="true" />
                      </summary>
                      <p>{answer}</p>
                    </details>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <Reveal className="container footer-inner">
            <Brand />
            <p>A sua voz também faz parte da sua jornada.</p>
            <nav aria-label="Contatos oficiais">
              <a
                href={course.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="instagram" />
                Instagram<span className="sr-only"> (nova aba)</span>
              </a>
              <a
                href={course.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="message" />
                WhatsApp<span className="sr-only"> (nova aba)</span>
              </a>
              <a href={course.email}>
                <Icon name="mail" />
                E-mail
              </a>
            </nav>
          </Reveal>
          <div className="container footer-bottom">
            <span>© {new Date().getFullYear()} Saga Eloquência</span>
            <span>Com Leonardo Hermes.</span>
            <span className="footer-credit">
              Feito por{" "}
              <a
                href="https://www.dazumdigital.com.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                DazumDigital<span className="sr-only"> (nova aba)</span>
              </a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
