/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MessageCircle, CheckCircle2, ArrowRight, MapPin, Instagram, Phone, Sparkles } from "lucide-react";

const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=5548999454480";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  key?: React.Key;
}

const FadeIn = ({ children, delay = 0, direction = "up" }: FadeInProps) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  key?: React.Key;
}

const FloatingElement = ({ children, duration = 4, delay = 0 }: FloatingElementProps) => (
  <motion.div
    animate={{
      y: [0, -15, 0],
      rotate: [0, 2, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FDFCFB] text-[#2D2D2D] font-sans selection:bg-[#E5D5C5] selection:text-[#4A3B31] overflow-x-hidden">
      
      {/* Organic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#E5D5C5]/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[5%] w-[35%] h-[35%] bg-[#D4C3B3]/15 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-[#F0E6DD]/30 blur-[110px] rounded-full" 
        />
      </div>

      {/* Floating WhatsApp Button with Pulse */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#25D366]/30 rounded-full blur-xl"
        />
        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="relative bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#128C7E] transition-colors duration-300"
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </motion.a>
      </div>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col lg:flex-row items-center overflow-hidden z-10">
        <motion.div 
          style={{ scale: heroImageScale }}
          className="w-full lg:w-1/2 h-[60vh] lg:h-screen relative order-1 lg:order-2 overflow-hidden"
        >
          <img
            src="https://i.imgur.com/UMmLBVN.jpg"
            alt="Dra. Ana Flávia - Harmonização Orofacial"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFB] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#FDFCFB] lg:to-transparent" />
        </motion.div>

        <motion.div 
          style={{ opacity: heroTextOpacity }}
          className="w-full lg:w-1/2 px-6 py-12 lg:px-24 flex flex-col justify-center order-2 lg:order-1"
        >
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm uppercase tracking-[0.4em] text-[#A68B77] font-medium">
                Estética & Bem-estar
              </span>
              <Sparkles className="w-4 h-4 text-[#E5D5C5]" />
            </div>
            <h1 className="font-serif text-5xl lg:text-8xl leading-[1.05] mb-8 text-[#4A3B31]">
              Realce sua beleza com <span className="italic relative inline-block">
                naturalidade
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 h-1 bg-[#E5D5C5]/50" 
                />
              </span> e confiança.
            </h1>
            <p className="text-lg lg:text-xl text-[#6B5E55] mb-12 max-w-lg leading-relaxed">
              Tratamentos personalizados de harmonização orofacial focados em elevar sua autoestima através de resultados sutis e elegantes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden bg-[#4A3B31] text-white px-10 py-5 rounded-full text-lg font-semibold flex items-center justify-center gap-3 transition-all duration-500 shadow-[0_20px_50px_rgba(74,59,49,0.3)] border border-[#E5D5C5]/20 group"
              >
                {/* Shine effect */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"
                />
                <span className="relative z-10 flex items-center gap-3">
                  Agendar Consulta <MessageCircle className="w-5 h-5" />
                </span>
              </motion.a>
            </div>
          </FadeIn>
        </motion.div>
      </header>

      {/* Identification of Pain */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <FadeIn>
                <h2 className="font-serif text-4xl lg:text-6xl text-[#4A3B31] leading-tight">
                  Você sente que o tempo está deixando marcas que <span className="italic text-[#A68B77]">não combinam</span> com você?
                </h2>
              </FadeIn>
              <div className="space-y-8">
                {[
                  "O incômodo com as rugas de expressão ao sorrir.",
                  "A insatisfação com a harmonia do seu sorriso.",
                  "Aquela sensação de cansaço ao se olhar no espelho.",
                  "A baixa autoestima que impede você de se sentir plena."
                ].map((item, index) => (
                  <FadeIn key={index} delay={index * 0.1} direction="left">
                    <div className="flex items-start gap-5 group">
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="mt-1 bg-[#E5D5C5] p-2 rounded-xl shadow-sm group-hover:bg-[#4A3B31] group-hover:text-white transition-colors duration-300"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </motion.div>
                      <p className="text-lg lg:text-xl text-[#6B5E55] leading-relaxed">{item}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <FadeIn delay={0.5}>
                <p className="text-2xl font-serif text-[#4A3B31] italic border-l-4 border-[#E5D5C5] pl-6 py-2">
                  Eu estou aqui para ajudar você a reencontrar sua melhor versão.
                </p>
              </FadeIn>
            </div>
            <div className="relative">
              <FadeIn direction="right">
                <FloatingElement duration={6}>
                  <div className="relative z-10">
                    <img
                      src="https://i.imgur.com/FT64dKG.jpg"
                      alt="Dra. Ana Flávia em atendimento"
                      className="rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] w-full aspect-[4/5] object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="absolute -bottom-10 -left-10 bg-white p-10 rounded-3xl shadow-2xl hidden md:block max-w-xs border border-[#F0E6DD]"
                    >
                      <p className="text-[#4A3B31] font-serif text-2xl italic leading-snug">"A verdadeira beleza está no equilíbrio entre o que somos e o que mostramos."</p>
                    </motion.div>
                  </div>
                </FloatingElement>
              </FadeIn>
              {/* Decorative circle */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-40 h-40 border border-[#E5D5C5] rounded-full border-dashed opacity-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-white/50 backdrop-blur-sm relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <span className="text-sm uppercase tracking-[0.4em] text-[#A68B77] font-medium mb-6 block">Conheça a Expert</span>
            <h2 className="font-serif text-5xl lg:text-7xl text-[#4A3B31] mb-10">Dra. Ana Flávia</h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <p className="text-2xl text-[#6B5E55] font-serif italic">
                Cirurgiã-Dentista (CRO-SC 25242) especialista em Clínica Geral e Harmonização Orofacial.
              </p>
              <p className="text-lg lg:text-xl text-[#6B5E55] leading-relaxed">
                Com um olhar clínico apurado e foco total na naturalidade, meu propósito é transformar vidas através do sorriso e da estética facial, sempre priorizando a saúde e o bem-estar de cada paciente.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-12 mt-16">
              {[
                { label: "Atendimento", val: "Premium" },
                { label: "Resultados", val: "Natural" },
                { label: "Experiência", val: "Exclusiva" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-8">
                  <div className="text-center">
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-4xl font-serif text-[#4A3B31] mb-1"
                    >
                      {item.val}
                    </motion.p>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#A68B77]">{item.label}</p>
                  </div>
                  {i < 2 && <div className="hidden md:block w-px h-16 bg-[#E5D5C5]" />}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Work Grid */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl lg:text-6xl text-[#4A3B31] mb-6">Um pouco do meu trabalho</h2>
              <div className="w-24 h-1 bg-[#E5D5C5] mx-auto rounded-full" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              "https://i.imgur.com/GkoZogU.jpg",
              "https://i.imgur.com/uHwZalg.jpg",
              "https://i.imgur.com/Ho97m9H.jpg"
            ].map((img, index) => (
              <FadeIn key={index} delay={index * 0.2}>
                <motion.div
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-[2rem] shadow-2xl aspect-[3/4]"
                >
                  <img
                    src={img}
                    alt={`Atendimento Dra. Ana Flávia ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B31]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <p className="text-white font-serif text-xl italic">Excelência em cada detalhe</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-32 bg-[#4A3B31] text-white relative z-10 overflow-hidden">
        <motion.div 
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-full h-full border border-white/5 rounded-full" 
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              { title: "Atendimento Personalizado", desc: "Cada rosto é único, por isso cada plano de tratamento é exclusivo." },
              { title: "Resultados Naturais", desc: "Foco total na sutileza, evitando exageros e preservando sua identidade." },
              { title: "Ambiente Premium", desc: "Um espaço acolhedor e profissional projetado para sua total segurança." },
              { title: "Técnicas Atualizadas", desc: "Uso constante das melhores tecnologias e procedimentos do mercado." }
            ].map((diff, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="space-y-6 group">
                  <div className="w-12 h-1 bg-[#E5D5C5] group-hover:w-20 transition-all duration-500" />
                  <h3 className="font-serif text-3xl leading-tight">{diff.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed">{diff.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-24">
              <h2 className="font-serif text-4xl lg:text-6xl text-[#4A3B31] mb-6">Como funciona?</h2>
              <p className="text-[#A68B77] uppercase tracking-[0.4em] text-sm font-medium">Simples, rápido e seguro</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { step: "01", title: "Clique no Botão", desc: "Inicie sua jornada clicando em qualquer botão de WhatsApp na página." },
              { step: "02", title: "Fale Conosco", desc: "Tire suas dúvidas e receba as primeiras orientações diretamente comigo." },
              { step: "03", title: "Agende sua Consulta", desc: "Escolha o melhor horário para seu atendimento exclusivo." }
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.2}>
                <div className="text-center space-y-6 relative">
                  <motion.span 
                    whileInView={{ scale: [1, 1.2, 1] }}
                    className="font-serif text-8xl text-[#E5D5C5]/30 block absolute -top-12 left-1/2 -translate-x-1/2 -z-10"
                  >
                    {item.step}
                  </motion.span>
                  <h3 className="text-2xl font-serif text-[#4A3B31]">{item.title}</h3>
                  <p className="text-[#6B5E55] text-lg leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-40 relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-16 lg:p-24 rounded-[4rem] shadow-[0_50px_100px_rgba(74,59,49,0.1)] border border-[#F0E6DD] relative overflow-hidden"
          >
            {/* Inner background glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#E5D5C5]/20 blur-[80px] rounded-full" />
            
            <div className="relative z-10">
              <h2 className="font-serif text-5xl lg:text-7xl text-[#4A3B31] mb-10 leading-tight">
                Pronta para transformar sua <span className="italic text-[#A68B77]">autoestima</span>?
              </h2>
              <p className="text-xl lg:text-2xl text-[#6B5E55] mb-16 max-w-2xl mx-auto leading-relaxed">
                Não deixe para depois o cuidado que você merece hoje. Agende sua avaliação e descubra como podemos realçar sua beleza natural.
              </p>
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden inline-flex items-center gap-4 bg-[#4A3B31] text-white px-12 py-6 rounded-full text-2xl font-semibold transition-all duration-500 shadow-[0_25px_60px_rgba(74,59,49,0.35)] border border-[#E5D5C5]/30 group"
              >
                {/* Shine effect */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"
                />
                <span className="relative z-10 flex items-center gap-4">
                  Falar com a Dra. Ana Flávia <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-[#FDFCFB] border-t border-[#F0E6DD] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-3xl text-[#4A3B31] mb-2">Dra. Ana Flávia</h3>
              <p className="text-[#A68B77] text-sm tracking-[0.4em] uppercase font-medium">Cirurgiã-Dentista | CRO-SC 25242</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-4 text-[#6B5E55]">
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-[#F0E6DD]">
                <MapPin className="w-4 h-4 text-[#A68B77]" />
                <span className="font-medium">Santo Amaro da Imperatriz, SC</span>
              </div>
              <div className="flex items-center gap-6 mt-4">
                <motion.a whileHover={{ y: -3 }} href="#" className="text-[#A68B77] hover:text-[#4A3B31] transition-colors"><Instagram className="w-6 h-6" /></motion.a>
                <motion.a whileHover={{ y: -3 }} href={WHATSAPP_LINK} className="text-[#A68B77] hover:text-[#4A3B31] transition-colors"><Phone className="w-6 h-6" /></motion.a>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-[#F0E6DD] text-center text-sm text-[#A68B77] tracking-widest uppercase">
            <p>&copy; {new Date().getFullYear()} Dra. Ana Flávia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
