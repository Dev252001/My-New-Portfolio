import { useTheme } from './hooks/useTheme';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Education from './components/Education';
import Skills from './components/Skills/Skills';
import GitHub from './components/GitHub/GitHub';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ThemeRipple from './components/ThemeRipple';
import site from './data/site';

function App() {
  const { theme, toggle, ripple } = useTheme();

  return (
    <div className="min-h-screen bg-bg text-ink font-sans">
      <CustomCursor />
      <ThemeRipple />

      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200]
          focus:bg-ink focus:text-bg focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      <Nav nav={site.nav} theme={theme} onToggleTheme={toggle} />

      <main id="main-content">
        {/* Hero */}
        <Hero hero={site.hero} />

        {/* Projects */}
        <div className="border-t border-line">
          <Projects />
        </div>

        {/* Experience */}
        <div className="border-t border-line">
          <Experience />
        </div>

        {/* Education */}
        <div className="border-t border-line">
          <Education />
        </div>

        {/* Skills */}
        <div className="border-t border-line">
          <Skills />
        </div>

        {/* GitHub */}
        <div className="border-t border-line">
          <GitHub />
        </div>

        {/* Certifications */}
        <div className="border-t border-line">
          <Certifications />
        </div>

        {/* Contact */}
        <div className="border-t border-line">
          <Contact contact={site.contact} />
        </div>
      </main>

      <Footer name={site.footer.name} />
    </div>
  );
}

export default App;
