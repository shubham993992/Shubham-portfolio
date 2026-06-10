/* ═══════════════════════════════════════════════════
   SHUBHAM KUMAR — AIML PORTFOLIO | JSON Powered Chatbot
   Bhagwa Theme · All interactions & animations
═══════════════════════════════════════════════════ */
//this block of code for visitor count 
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.counterapi.dev/v1/shubham-portfolio993992/visits/up')
    .then(response => response.json())
    .then(data => {
      document.getElementById('visitCount').textContent =
        data.count.toLocaleString();
    })
    .catch(error => {
      console.error(error);
      document.getElementById('visitCount').textContent = '0';
    });
});
//visitor count code ends here


(function() {
  // ========== 1. CUSTOM CURSOR ==========
  const dot = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animateTrail() {
    tx += (mx - tx) * 0.13;
    ty += (my - ty) * 0.13;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  const interactiveElements = document.querySelectorAll('a, button, .stack-chip, .spill, .cb-chip, .hbtn, .pact-ghost, .pact-solid');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      trail.style.width = '52px';
      trail.style.height = '52px';
      trail.style.opacity = '0.8';
    });
    el.addEventListener('mouseleave', () => {
      trail.style.width = '36px';
      trail.style.height = '36px';
      trail.style.opacity = '0.6';
    });
  });

  // ========== 2. ANIMATED BACKGROUND CANVAS ==========
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const PARTICLES = [];
  const COUNT = 70;
  const COLORS = ['rgba(255,107,0,', 'rgba(255,179,71,', 'rgba(255,140,0,'];

  for (let i = 0; i < COUNT; i++) {
    PARTICLES.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
      col: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
  }

  let mouseX = W / 2, mouseY = H / 2;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCanvas() {
    ctx.clearRect(0, 0, W, H);
    PARTICLES.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 100) {
        p.x += dx / d * 0.7;
        p.y += dy / d * 0.7;
      }
    });
    for (let i = 0; i < PARTICLES.length; i++) {
      for (let j = i + 1; j < PARTICLES.length; j++) {
        const a = PARTICLES[i];
        const b = PARTICLES[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,107,0,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    PARTICLES.forEach(p => {
      const glow = (Math.sin(p.pulse) + 1) / 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + (0.2 + glow * 0.4) + ')';
      ctx.fill();
    });
    requestAnimationFrame(renderCanvas);
  }
  renderCanvas();

  // ========== 3. ROLE TYPEWRITER ==========
  const roles = ['AI Engineer', 'ML Researcher', 'Deep Learning Dev', 'NLP Specialist', 'Data Scientist', 'Problem Solver'];
  let roleIndex = 0, charIndex = 0, isDeleting = false;
  const roleElement = document.getElementById('role-text');

  function typeRole() {
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
      roleElement.textContent = currentRole.slice(0, ++charIndex);
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeRole, 1800);
        return;
      }
      setTimeout(typeRole, 65);
    } else {
      roleElement.textContent = currentRole.slice(0, --charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 400);
        return;
      }
      setTimeout(typeRole, 32);
    }
  }
  typeRole();

  // ========== 4. BRAIN ORBIT NODES ==========
  const brainWrap = document.getElementById('brain-wrap');
  if (brainWrap) {
    const orbitNodes = [
      { deg: 30, col: '#FF6B00', size: 10 },
      { deg: 120, col: '#FFB347', size: 8 },
      { deg: 210, col: '#FF6B00', size: 10 },
      { deg: 300, col: '#FFD700', size: 8 },
      { deg: 75, col: '#FF8C00', size: 6 },
      { deg: 255, col: '#FF8C00', size: 6 }
    ];
    orbitNodes.forEach(node => {
      const rad = (node.deg * Math.PI) / 180;
      const radius = 160;
      const orbitDot = document.createElement('div');
      orbitDot.style.cssText = `
        position: absolute;
        width: ${node.size}px;
        height: ${node.size}px;
        border-radius: 50%;
        background: ${node.col};
        left: calc(50% + ${Math.cos(rad) * radius}px - ${node.size / 2}px);
        top: calc(50% + ${Math.sin(rad) * radius}px - ${node.size / 2}px);
        box-shadow: 0 0 10px ${node.col};
        pointer-events: none;
      `;
      brainWrap.appendChild(orbitDot);
    });
  }

  // ========== 5. SCROLL REVEAL + SKILL BARS + COUNTERS ==========
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (!entry.isIntersecting) return;
      entry.target.style.transitionDelay = (idx % 4) * 0.1 + 's';
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.sk-fill').forEach(bar => {
        const width = bar.dataset.w;
        if (width) bar.style.width = width + '%';
      });
      entry.target.querySelectorAll('[data-target]').forEach(counter => {
        const target = parseInt(counter.dataset.target);
        let current = 0;
        const step = target / 50;
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          counter.textContent = Math.round(current) + '+';
          if (current >= target) clearInterval(interval);
        }, 30);
      });
    });
  }, { threshold: 0.15 });
  revealElements.forEach(el => revealObserver.observe(el));

  // ========== 6. NAV ACTIVE ON SCROLL ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-a');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(section => sectionObserver.observe(section));

  // ========== 7. MOBILE HAMBURGER MENU ==========
  const hamburger = document.getElementById('ham-btn');
  const mobileMenu = document.getElementById('mob-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    document.querySelectorAll('.mob-a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ========== 8. JSON-POWERED CHATBOT ==========
  let botData = null;
  let isChatOpen = false;

  // Load JSON data
  async function loadChatbotData() {
    try {
      const response = await fetch('chatbot-data.json');
      if (!response.ok) throw new Error('Failed to load chatbot data');
      botData = await response.json();
      console.log('✅ Chatbot data loaded successfully from JSON');
      return true;
    } catch (error) {
      console.error('❌ Error loading chatbot data:', error);
      // Fallback data if JSON fails to load
      botData = {
        botName: "AIML-Bot",
        greeting: "Namaste! 🙏 I'm AIML-Bot. (Using fallback data) Ask me about Shubham's skills, projects, contact, resume, education, or experience!",
        categories: {},
        fallbackResponses: ["I'm here to help! Ask about Shubham's skills, projects, or contact info."],
        farewellResponses: ["Thanks for chatting! 👋"]
      };
      return false;
    }
  }

  // Get response based on user message
  function getResponseFromJSON(userMessage) {
    if (!botData || !botData.categories) {
      return "I'm still loading my knowledge base. Please try again in a moment! 🤖";
    }

    const msg = userMessage.toLowerCase();
    
    // Check for farewell
    const farewellKeywords = ['bye', 'goodbye', 'see you', 'later', 'thanks', 'thank you', 'thx', 'cya'];
    if (farewellKeywords.some(kw => msg.includes(kw))) {
      const farewells = botData.farewellResponses || ["Thanks for chatting! 👋"];
      return farewells[Math.floor(Math.random() * farewells.length)];
    }

    // Search through categories
    for (const [category, data] of Object.entries(botData.categories)) {
      if (data.keywords && data.keywords.some(keyword => msg.includes(keyword))) {
        return data.response;
      }
    }

    // Fallback responses
    const fallbacks = botData.fallbackResponses || ["I'm not sure about that! Try asking about Shubham's skills, projects, or contact info."];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Chatbot DOM elements
  const chatFab = document.getElementById('cb-fab');
  const chatWindow = document.getElementById('cb-window');
  const chatMessages = document.getElementById('cb-messages');
  const chatInput = document.getElementById('cb-input');
  const chatSend = document.getElementById('cb-send');
  const chatClose = document.getElementById('cb-close');
  const suggestionChips = document.querySelectorAll('.cb-chip');
  const openIcon = document.querySelector('.cb-fab .open-icon');
  const closeIcon = document.querySelector('.cb-fab .close-icon');

  function toggleChat() {
    isChatOpen = !isChatOpen;
    chatWindow.classList.toggle('open', isChatOpen);
    if (openIcon && closeIcon) {
      openIcon.style.display = isChatOpen ? 'none' : 'flex';
      closeIcon.style.display = isChatOpen ? 'flex' : 'none';
    }
    if (isChatOpen && chatMessages.children.length === 0 && botData) {
      setTimeout(() => addBotMessage(botData.greeting || "Namaste! 🙏 Ask me about Shubham!"), 300);
    }
  }

  chatFab.addEventListener('click', toggleChat);
  chatClose.addEventListener('click', toggleChat);

  function addBotMessage(text) { addMessage(text, 'bot'); }
  function addUserMessage(text) { addMessage(text, 'user'); }

  function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `cbmsg ${type}`;
    const icon = document.createElement('div');
    icon.className = 'cbmsg-icon';
    icon.textContent = type === 'bot' ? '🤖' : '👤';
    const bubble = document.createElement('div');
    bubble.className = 'cbmsg-bubble';
    bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    messageDiv.appendChild(icon);
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'cbmsg bot';
    typingDiv.id = 'typing-indicator';
    const icon = document.createElement('div');
    icon.className = 'cbmsg-icon';
    icon.textContent = '🤖';
    const typing = document.createElement('div');
    typing.className = 'cb-typing';
    typing.innerHTML = '<div class="cb-tdot"></div><div class="cb-tdot"></div><div class="cb-tdot"></div>';
    typingDiv.appendChild(icon);
    typingDiv.appendChild(typing);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }

  function sendMessage(messageText) {
    const text = (messageText || chatInput.value).trim();
    if (!text) return;
    addUserMessage(text);
    chatInput.value = '';
    showTypingIndicator();
    setTimeout(() => {
      hideTypingIndicator();
      addBotMessage(getResponseFromJSON(text));
    }, 600 + Math.random() * 400);
  }

  chatSend.addEventListener('click', () => sendMessage());
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Suggestion chips using data-category attribute
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const category = chip.getAttribute('data-category');
      if (category && botData && botData.categories[category]) {
        sendMessage(category);
      } else {
        sendMessage(chip.textContent.replace(/[^\w\s]/g, '').trim());
      }
    });
  });

  // Load JSON data when page loads
  loadChatbotData();
})();