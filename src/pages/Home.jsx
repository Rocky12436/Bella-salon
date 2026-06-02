import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scissors, Sparkles, Star, MapPin, Phone, Clock, Award, Shield, 
  CheckCircle, ArrowRight, MessageSquare, BookOpen, GraduationCap 
} from 'lucide-react';
import bela1 from '../assets/bela-1.png';
import bela2 from '../assets/bela-2.png';
import bela3 from '../assets/bela-3.png';
import bela4 from '../assets/bela-4.png';

export default function Home() {
  const navigate = useNavigate();

  // Custom function to smooth scroll to an element
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredImages = [
    { src: bela1, title: 'Bespoke Styling Station', desc: 'Where expert transformations happen.' },
    { src: bela2, title: 'Premium Products & Academy', desc: 'Top tier tools and education for elite stylists.' },
    { src: bela3, title: 'Expert Training Center', desc: 'Preparing future leaders of the beauty industry.' },
    { src: bela4, title: 'Luxury Hair Treatments', desc: 'Precision cuts, color work, and spa treatments.' }
  ];

  return (
    <div className="home-container fade-in">
      
      {/* 1. LUXURIOUS HERO SECTION */}
      <section className="hero-section" style={{
        position: 'relative',
        height: '92vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(rgba(28, 28, 30, 0.8), rgba(28, 28, 30, 0.85)), url(${bela1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        textAlign: 'center',
        padding: '0 20px',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)',
          zIndex: 1
        }}></div>

        <div className="hero-content" style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '850px',
          animation: 'fadeIn 1s ease-out'
        }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px',
            fontSize: '12px', 
            letterSpacing: '4px', 
            textTransform: 'uppercase', 
            color: 'var(--gold)', 
            border: '1px solid rgba(201, 168, 76, 0.4)', 
            padding: '8px 24px', 
            borderRadius: '100px', 
            marginBottom: '28px',
            background: 'rgba(28, 28, 30, 0.6)',
            backdropFilter: 'blur(4px)'
          }}>
            <Sparkles size={14} /> Luxury Unisex Salon & Professional Academy
          </div>

          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'calc(36px + 2.5vw)',
            fontWeight: '300',
            lineHeight: '1.1',
            letterSpacing: '1px',
            marginBottom: '24px',
            textTransform: 'uppercase'
          }}>
            Bela Salon <br />
            <span style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: '400', fontSize: 'calc(20px + 1.5vw)', color: 'var(--gold-light)', display: 'block', marginTop: '10px' }}>
              & Academy
            </span>
          </h1>

          <p style={{
            color: '#ddd',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto 36px',
            fontWeight: '300',
            lineHeight: '1.6'
          }}>
            Experience world-class hair styling, clinical hygiene, and elite styling academies, situated in the heart of Gadge Nagar, Amravati.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <button 
              className="btn btn-gold" 
              onClick={() => navigate('/book')}
              style={{ padding: '16px 36px', fontSize: '14px', borderRadius: '4px' }}
            >
              Book Appointment <ArrowRight size={16} />
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => scrollToSection('services-catalog')}
              style={{ 
                padding: '16px 36px', 
                fontSize: '14px', 
                borderRadius: '4px',
                borderColor: 'rgba(255,255,255,0.3)',
                color: '#fff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.color = 'var(--gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                e.currentTarget.style.color = '#fff';
              }}
            >
              Explore Services
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          onClick={() => scrollToSection('about-section')}
          style={{
            position: 'absolute',
            bottom: '30px',
            zIndex: 2,
            cursor: 'pointer',
            animation: 'bounce 2s infinite',
            color: 'var(--gold-light)',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>Discover</span>
          <div style={{ width: '1px', height: '30px', background: 'var(--gold)', marginTop: '4px' }}></div>
        </div>
      </section>

      {/* 2. ABOUT ACADEMY & SALON SECTION */}
      <section id="about-section" style={{
        padding: '100px 20px 80px',
        background: 'var(--cream)',
        color: 'var(--dark)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' }}>
            
            {/* Left Content Column */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--gold-dark)', letterSpacing: '2px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={16} /> Elite Brand Heritage
              </div>
              <h2 style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '44px',
                fontWeight: '300',
                lineHeight: '1.2',
                color: 'var(--charcoal)',
                marginBottom: '24px'
              }}>
                Amravati's Premium <br />
                <span style={{ fontStyle: 'italic', color: 'var(--gold-dark)' }}>Styling Sanctuary & Academy</span>
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--mid)', marginBottom: '20px', lineHeight: '1.7' }}>
                Bela Salon & Academy in Gadge Nagar is recognized for setting impeccable standards in the industry. As a leading unisex salon, we combine state-of-the-art styling stations with highly customized haircare solutions.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--mid)', marginBottom: '32px', lineHeight: '1.7' }}>
                Our academy is the vanguard of style education in Maharashtra. We train passionate styling enthusiasts with hands-on, high-end practical experience, teaching advanced coloring methodologies, design cuts, and premium aesthetics.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '36px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                  <Shield style={{ color: 'var(--gold)', flexShrink: 0 }} size={24} />
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '700' }}>Clinical Hygiene</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--soft)' }}>Rigorous sanitization for complete peace of mind.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                  <GraduationCap style={{ color: 'var(--gold)', flexShrink: 0 }} size={24} />
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '700' }}>Elite Academy</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--soft)' }}>Mentoring the future generation of expert stylists.</p>
                  </div>
                </div>
              </div>

              <button 
                className="btn btn-gold" 
                onClick={() => navigate('/book')}
                style={{ borderRadius: '4px' }}
              >
                Book Your Experience
              </button>
            </div>

            {/* Right Asset Image Showcase Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              position: 'relative'
            }}>
              {/* Decorative background shape */}
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '120px',
                height: '120px',
                border: '1.5px solid var(--gold-light)',
                zIndex: 0,
                opacity: 0.5
              }}></div>

              {featuredImages.map((img, i) => (
                <div 
                  key={i} 
                  style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    height: i % 2 === 0 ? '220px' : '260px',
                    marginTop: i === 1 ? '-20px' : i === 2 ? '20px' : '0px',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border)',
                    zIndex: 1,
                    transition: 'all 0.4s ease'
                  }}
                  className="hover-scale-card"
                >
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(28,28,30,0.85))',
                    padding: '16px 12px',
                    color: '#fff'
                  }}>
                    <h5 style={{ margin: '0 0 2px', fontSize: '12px', fontWeight: '600', color: 'var(--gold-light)' }}>{img.title}</h5>
                    <p style={{ margin: 0, fontSize: '9px', color: '#ccc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. PREMIUM ADVANCED HYGIENE BANNER */}
      <section style={{
        background: 'var(--charcoal)',
        color: '#fff',
        padding: '60px 20px',
        textAlign: 'center',
        borderTop: '1px solid var(--border-dark)',
        borderBottom: '1px solid var(--border-dark)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-20%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(201, 168, 76, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(45, 122, 79, 0.15)', border: '1px solid var(--success)', borderRadius: '100px', padding: '6px 16px', color: '#a2e0bc', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
            <CheckCircle size={12} style={{ marginRight: '6px' }} /> Uncompromising Safety & Hygiene Standards
          </div>
          <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '32px', fontWeight: '300', marginBottom: '16px' }}>
            Your Safety is Our Signature
          </h3>
          <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
            We implement autoclaves for all structural styling tools, utilize high-grade single-use disposable towels, and conduct deep chemical cleaning cycles across styling chairs multiple times a day.
          </p>
        </div>
      </section>

      {/* 4. VISUAL SERVICES CATALOG SECTION */}
      <section id="services-catalog" style={{
        padding: '100px 20px',
        background: 'var(--cream)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--gold-dark)', letterSpacing: '3px' }}>Our Offerings</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '42px', fontWeight: '300', color: 'var(--charcoal)', marginTop: '8px', marginBottom: '16px' }}>
              Bespoke Treatments & Services
            </h2>
            <div style={{ width: '60px', height: '2px', background: 'var(--gold)', margin: '0 auto 16px' }}></div>
            <p style={{ color: 'var(--soft)', fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>
              Explore luxury treatments formulated by industry experts and executed with utmost precision.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            
            {/* Core Service requested by User - Hair Styling */}
            <div style={{
              background: '#fff',
              border: '1.5px solid var(--gold)',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: 'var(--shadow-gold)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'var(--gold)',
                color: '#fff',
                fontSize: '10px',
                fontWeight: '700',
                padding: '4px 16px',
                borderBottomLeftRadius: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Signature
              </div>

              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-dark)', marginBottom: '24px' }}>
                  <Scissors size={24} />
                </div>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '24px', color: 'var(--dark)', margin: '0 0 8px' }}>
                  Hair Styling Services
                </h3>
                <span style={{ 
                  display: 'inline-block', 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  color: 'var(--gold-dark)', 
                  background: 'var(--pending-bg)', 
                  padding: '4px 10px', 
                  borderRadius: '4px',
                  marginBottom: '16px'
                }}>
                  Ask for Price
                </span>
                <p style={{ fontSize: '13.5px', color: 'var(--soft)', lineHeight: '1.6', margin: 0 }}>
                  Hair Styling services provide expert solutions for creating the perfect look. Whether it is standard maintenance, complex bridal updos, styling for high-profile ceremonies, or modern dynamic blowouts—our elite academy-trained experts tailor the experience completely for your hair type.
                </p>
              </div>

              <div style={{ marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <button 
                  className="btn btn-gold" 
                  onClick={() => navigate('/book')}
                  style={{ width: '100%', borderRadius: '4px', fontSize: '12px', padding: '12px' }}
                >
                  Request Consultation & Book
                </button>
              </div>
            </div>

            {/* Additional Luxury Services for Completeness */}
            <div style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease'
            }} className="hover-lift-card">
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(201,168,76,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-dark)', marginBottom: '24px' }}>
                  <Sparkles size={24} />
                </div>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '24px', color: 'var(--dark)', margin: '0 0 8px' }}>
                  Royal Bridal Makeover
                </h3>
                <span style={{ 
                  display: 'inline-block', 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  color: 'var(--gold-dark)', 
                  background: 'var(--pending-bg)', 
                  padding: '4px 10px', 
                  borderRadius: '4px',
                  marginBottom: '16px'
                }}>
                  Starting ₹8,000
                </span>
                <p style={{ fontSize: '13.5px', color: 'var(--soft)', lineHeight: '1.6', margin: 0 }}>
                  A comprehensive royal treatment featuring masterclass hair design, flawless airbrush makeup, and continuous touch-ups. Designed for brides who want nothing less than perfection on their special day.
                </p>
              </div>

              <div style={{ marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <button 
                  className="btn btn-outline" 
                  onClick={() => navigate('/book')}
                  style={{ width: '100%', borderRadius: '4px', fontSize: '12px', padding: '12px' }}
                >
                  View Details & Book
                </button>
              </div>
            </div>

            {/* Spa & Rejuvenation */}
            <div style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease'
            }} className="hover-lift-card">
              <div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(201,168,76,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-dark)', marginBottom: '24px' }}>
                  <BookOpen size={24} />
                </div>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '24px', color: 'var(--dark)', margin: '0 0 8px' }}>
                  Academy Training Programs
                </h3>
                <span style={{ 
                  display: 'inline-block', 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  color: 'var(--gold-dark)', 
                  background: 'var(--pending-bg)', 
                  padding: '4px 10px', 
                  borderRadius: '4px',
                  marginBottom: '16px'
                }}>
                  Interactive Curriculum
                </span>
                <p style={{ fontSize: '13.5px', color: 'var(--soft)', lineHeight: '1.6', margin: 0 }}>
                  Earn recognized certificates in hair technology, skin design, and cosmetology. Learn directly under seasoned mentors with practical client sessions at our Gadge Nagar academic hub.
                </p>
              </div>

              <div style={{ marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <a 
                  href="tel:08511007477"
                  className="btn btn-outline" 
                  style={{ width: '100%', borderRadius: '4px', fontSize: '12px', padding: '12px', textDecoration: 'none' }}
                >
                  Call Academy Inquiry
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CLIENT TESTIMONIAL SHOWCASE */}
      <section style={{
        padding: '100px 20px 110px',
        background: 'var(--charcoal)',
        color: '#fff',
        borderTop: '1px solid var(--border-dark)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginBottom: '16px' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} size={18} fill="var(--gold)" stroke="none" style={{ margin: '0 2px' }} />
            ))}
          </div>

          <span style={{ display: 'block', fontSize: '11px', fontWeight: '600', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: '24px' }}>
            Voice of Our Patrons
          </span>

          <h2 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '40px',
            fontWeight: '300',
            lineHeight: '1.25',
            marginBottom: '40px'
          }}>
            What Our Exceptional <br /><span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Customers Experience</span>
          </h2>

          {/* Testimonials Container */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-dark)',
            borderRadius: '16px',
            padding: '48px 32px',
            position: 'relative',
            backdropFilter: 'blur(8px)'
          }}>
            {/* Big quote graphic */}
            <div style={{
              position: 'absolute',
              top: '15px',
              left: '30px',
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '120px',
              color: 'rgba(201,168,76,0.08)',
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none'
            }}>“</div>

            {/* Testimonial Quote requested by User */}
            <p style={{
              fontSize: '18px',
              fontStyle: 'italic',
              lineHeight: '1.75',
              color: '#eaeaea',
              marginBottom: '28px',
              fontWeight: '300',
              position: 'relative',
              zIndex: 1
            }}>
              "My experience at Bela Salon was outstanding! The salon maintained impeccable hygiene standards, making me feel safe and comfortable. The highly attentive staff custom-styled my cut perfectly."
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--gold)',
                color: 'var(--charcoal)',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}>
                DA
              </div>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: '700', color: 'var(--gold-light)' }}>Devanand Aware</h4>
                <span style={{ fontSize: '11px', color: '#999' }}>Verified Customer · 06:50 PM</span>
              </div>
            </div>

            <div style={{ marginTop: '24px', fontSize: '11px', color: 'var(--soft)' }}>
              Source: <a href="https://www.justdial.com/Amravati/Bela-Salon-Academy-Near-Start-Of-Flyover-And-Gadge-Baba-Mandir-Gadge-Nagar/9999PX721-X721-240508122118-B4K8_BZDET" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Justdial.com</a>
            </div>

          </div>

          <div style={{ marginTop: '36px' }}>
            <button 
              className="btn btn-outline" 
              onClick={() => navigate('/book')}
              style={{ padding: '12px 28px', fontSize: '12px', borderColor: 'var(--border-dark)', color: '#fff' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.color = 'var(--gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-dark)';
                e.currentTarget.style.color = '#fff';
              }}
            >
              <MessageSquare size={14} style={{ marginRight: '6px' }} /> Read More Customer Stories
            </button>
          </div>

        </div>
      </section>

      {/* 6. DETAILED LOCATION & CONTACT SECTION */}
      <section style={{
        padding: '100px 20px 80px',
        background: 'var(--cream)',
        color: 'var(--dark)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px' }}>
            
            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--gold-dark)', letterSpacing: '2px', marginBottom: '12px' }}>
                Visit & Contact Us
              </span>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '40px', fontWeight: '300', color: 'var(--charcoal)', marginBottom: '32px' }}>
                We Are Eager <br />To Welcome You
              </h2>

              {/* Call Card */}
              <a href="tel:08511007477" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '24px',
                marginBottom: '20px',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease'
              }} className="hover-lift-card">
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  color: 'var(--charcoal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone size={20} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--soft)', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Hotline (Click to Call)</span>
                  <strong style={{ fontSize: '20px', color: 'var(--gold-dark)', fontFamily: '"Cormorant Garamond", serif' }}>08511007477</strong>
                </div>
              </a>

              {/* Address Card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(201,168,76,0.1)',
                  color: 'var(--gold-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--soft)', textTransform: 'uppercase', letterSpacing: '1px' }}>Our Location</span>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--dark)', lineHeight: '1.5', fontWeight: '500' }}>
                    Near Start Of Flyover and Gadge Baba Mandir, Panchvati Road, Gadge Nagar, Amravati-444604, Maharashtra
                  </p>
                </div>
              </div>

              {/* Hours Card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(201,168,76,0.1)',
                  color: 'var(--gold-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Clock size={20} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--soft)', textTransform: 'uppercase', letterSpacing: '1px' }}>Salon & Academy Timings</span>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--dark)', fontWeight: '500' }}>
                    Monday - Sunday: 9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>

            </div>

            {/* Map Frame Embedded */}
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border)',
              height: '480px',
              position: 'relative'
            }}>
              {/* Actual Google Maps Iframe showing Panchvati Road, Amravati */}
              <iframe
                title="Bela Salon Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.598687494539!2d77.7610058!3d21.009712799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a5991823ebbd%3A0xe54d24177d54025a!2sBela%20Salon%20%26%20Academy!5e0!3m2!1sen!2sin!4v1717326880000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* 7. PREMIUM DARK FOOTER */}
      <footer style={{
        background: '#1C1C1E',
        color: '#fff',
        padding: '80px 20px 40px',
        borderTop: '1px solid var(--border-dark)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}>
            
            {/* Column 1 - Brand info */}
            <div>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '26px', color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 16px' }}>
                Bela<span>Salon</span>
              </h3>
              <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.6', marginBottom: '24px' }}>
                Unisex luxury styling house & certified professional beauty academy. Bringing pristine aesthetic solutions and industry-leading training programs to Amravati.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                {/* Social circles */}
                {['FB', 'IG', 'YT', 'JD'].map(soc => (
                  <div key={soc} style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid var(--border-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: '700',
                    color: 'var(--gold-light)',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold)';
                    e.currentTarget.style.background = 'var(--gold)';
                    e.currentTarget.style.color = 'var(--charcoal)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-dark)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--gold-light)';
                  }}
                  >
                    {soc}
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 - Links */}
            <div>
              <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gold-light)', margin: '0 0 20px', fontWeight: '700' }}>
                Quick Operations
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <li>
                  <span onClick={() => scrollToSection('about-section')} style={{ color: '#aaa', cursor: 'pointer', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>About Academy</span>
                </li>
                <li>
                  <span onClick={() => scrollToSection('services-catalog')} style={{ color: '#aaa', cursor: 'pointer', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Services Catalog</span>
                </li>
                <li>
                  <span onClick={() => navigate('/book')} style={{ color: '#aaa', cursor: 'pointer', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Book Online Treatment</span>
                </li>
                <li>
                  <span onClick={() => navigate('/admin')} style={{ color: '#aaa', cursor: 'pointer', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#aaa'}>Management Portal</span>
                </li>
              </ul>
            </div>

            {/* Column 3 - Academy details */}
            <div>
              <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gold-light)', margin: '0 0 20px', fontWeight: '700' }}>
                Academy Courses
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#aaa' }}>
                <li>• Diploma in Cosmetology (6 Months)</li>
                <li>• Advanced Hair Styling & Design (3 Months)</li>
                <li>• Clinical Skin Care & Beautician Course</li>
                <li>• Master Bridal Makeup Artistry</li>
              </ul>
            </div>

            {/* Column 4 - Address Contact info */}
            <div>
              <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gold-light)', margin: '0 0 20px', fontWeight: '700' }}>
                Corporate Contact
              </h4>
              <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: '0 0 12px' }}>
                Near Start Of Flyover, Panchvati Road, Gadge Nagar, Amravati-444604, MH, India
              </p>
              <p style={{ color: 'var(--gold)', fontSize: '14px', fontWeight: '600', margin: 0 }}>
                Tel: 08511007477
              </p>
            </div>

          </div>

          <div style={{
            borderTop: '1px solid var(--border-dark)',
            paddingTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '11px',
            color: '#666'
          }}>
            <div>
              &copy; {new Date().getFullYear()} Bela Salon & Academy. All Rights Reserved. 
            </div>
            <div>
              Designed with precision for supreme customer styling and academy training.
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
