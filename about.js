// about.js - CYBER WARFARE JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
  console.log('AllSafe About Page - Cyber Warfare Interface v4.2.7 initialized');
  console.log('Loading classified modules...');
  
  // ========== MATRIX BACKGROUND ==========
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas to full screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~@";
  const chars = matrixChars.split('');
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];
  
  // Initialize drops
  for(let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -canvas.height;
  }
  
  function drawMatrix() {
    // Semi-transparent black rectangle for trail effect
    ctx.fillStyle = 'rgba(5, 5, 16, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px 'JetBrains Mono'`;
    
    for(let i = 0; i < drops.length; i++) {
      // Random character
      const char = chars[Math.floor(Math.random() * chars.length)];
      
      // Vary color intensity
      const intensity = 0.5 + Math.random() * 0.5;
      ctx.fillStyle = `rgba(0, 255, 65, ${intensity})`;
      
      // Draw character
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      
      // Move drop down
      drops[i]++;
      
      // Reset drop if it goes beyond screen with random chance
      if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = Math.random() * -50;
      }
    }
  }
  
  // Matrix animation interval
  const matrixInterval = setInterval(drawMatrix, 35);
  
  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.querySelector('.navbar-cyber');
  
  window.addEventListener('scroll', () => {
    if(window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Update threat level based on scroll
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    updateThreatLevel(scrollPercent);
  });
  
  // ========== ANIMATED COUNTERS ==========
  const counters = document.querySelectorAll('.stat-number');
  const animatedCounters = new Set();
  
  function animateCounter(element, target, duration = 2000) {
    let start = null;
    const startValue = parseInt(element.textContent) || 0;
    
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * (target - startValue) + startValue);
      
      // Format number with commas
      element.textContent = currentValue.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target.toLocaleString();
      }
    }
    
    requestAnimationFrame(step);
  }
  
  // Intersection Observer for counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedCounters.has(entry.target)) {
        const target = parseInt(entry.target.dataset.target);
        if (!isNaN(target)) {
          animateCounter(entry.target, target);
          animatedCounters.add(entry.target);
        }
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => counterObserver.observe(counter));
  
  // ========== CYBER GLOBE SIMULATION ==========
  const cyberGlobe = document.getElementById('cyberGlobe');
  let globeRotation = 0;
  let zoomLevel = 1;
  let showThreats = false;
  
  // Create globe visualization
  function createGlobe() {
    cyberGlobe.innerHTML = '';
    
    // Create globe container
    const globeContainer = document.createElement('div');
    globeContainer.className = 'globe-visual';
    globeContainer.style.cssText = `
      width: 100%;
      height: 100%;
      position: relative;
      transform: scale(${zoomLevel}) rotate(${globeRotation}deg);
      transition: transform 0.5s ease;
    `;
    
    // Create globe circles
    const outerCircle = document.createElement('div');
    outerCircle.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 250px;
      height: 250px;
      border: 2px solid rgba(0, 255, 255, 0.5);
      border-radius: 50%;
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    `;
    
    const innerCircle = document.createElement('div');
    innerCircle.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 200px;
      border: 1px solid rgba(57, 255, 20, 0.5);
      border-radius: 50%;
      box-shadow: 0 0 20px rgba(57, 255, 20, 0.2);
    `;
    
    // Create grid lines
    const gridLine1 = document.createElement('div');
    gridLine1.style.cssText = `
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.5), transparent);
      transform: rotate(${globeRotation}deg);
    `;
    
    const gridLine2 = document.createElement('div');
    gridLine2.style.cssText = `
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 1px;
      background: linear-gradient(180deg, transparent, rgba(0, 255, 255, 0.5), transparent);
      transform: rotate(${globeRotation}deg);
    `;
    
    // Add threat points if enabled
    if (showThreats) {
      for (let i = 0; i < 12; i++) {
        const threatPoint = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 12;
        const radius = 100 + Math.random() * 50;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        threatPoint.style.cssText = `
          position: absolute;
          top: calc(50% + ${y}px);
          left: calc(50% + ${x}px);
          width: 8px;
          height: 8px;
          background: #ff0066;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 15px #ff0066;
          animation: threat-pulse 2s infinite ${i * 0.2}s;
        `;
        
        cyberGlobe.appendChild(threatPoint);
      }
    }
    
    // Create connection lines
    const connectionLines = document.createElement('div');
    connectionLines.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;
    
    // Add some random connection lines
    for (let i = 0; i < 8; i++) {
      const line = document.createElement('div');
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const endX = Math.random() * 100;
      const endY = Math.random() * 100;
      
      const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
      const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      
      line.style.cssText = `
        position: absolute;
        top: ${startY}%;
        left: ${startX}%;
        width: ${length}%;
        height: 1px;
        background: linear-gradient(90deg, rgba(0, 255, 255, 0.8), rgba(57, 255, 20, 0.8));
        transform-origin: 0 0;
        transform: rotate(${angle}deg);
        opacity: 0.3;
      `;
      
      connectionLines.appendChild(line);
    }
    
    // Assemble globe
    globeContainer.appendChild(outerCircle);
    globeContainer.appendChild(innerCircle);
    globeContainer.appendChild(gridLine1);
    globeContainer.appendChild(gridLine2);
    globeContainer.appendChild(connectionLines);
    
    cyberGlobe.appendChild(globeContainer);
    
    // Add CSS for threat pulse animation
    if (!document.querySelector('#threat-pulse-style')) {
      const style = document.createElement('style');
      style.id = 'threat-pulse-style';
      style.textContent = `
        @keyframes threat-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.5; }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Initialize globe
  createGlobe();
  
  // Globe controls
  document.getElementById('rotateGlobe')?.addEventListener('click', () => {
    globeRotation += 45;
    createGlobe();
  });
  
  document.getElementById('zoomIn')?.addEventListener('click', () => {
    zoomLevel = zoomLevel === 1 ? 1.5 : 1;
    createGlobe();
  });
  
  document.getElementById('showThreats')?.addEventListener('click', () => {
    showThreats = !showThreats;
    createGlobe();
  });
  
  // Auto-rotate globe
  setInterval(() => {
    globeRotation += 0.5;
    const globeVisual = cyberGlobe.querySelector('.globe-visual');
    if (globeVisual) {
      globeVisual.style.transform = `scale(${zoomLevel}) rotate(${globeRotation}deg)`;
    }
  }, 50);
  
  // ========== OPERATIVE PROFILE VIEWER ==========
  const operativeButtons = document.querySelectorAll('.btn-operative');
  
  operativeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const operative = this.dataset.operative;
      viewOperativeProfile(operative);
    });
  });
  
  function viewOperativeProfile(operativeId) {
    // In a real application, this would fetch detailed data
    // For now, we'll show a simulated profile modal
    
    const profileData = {
      carter: {
        name: "ALEX CARTER",
        clearance: "LEVEL-9",
        specialty: "Offensive Cyber Operations",
        missions: 47,
        successRate: "98.7%",
        bio: "Former NSA TAO (Tailored Access Operations). Led multiple high-profile offensive cyber missions. Expert in AI-driven malware and infrastructure penetration."
      },
      rodriguez: {
        name: "MAYA RODRIGUEZ",
        clearance: "LEVEL-8",
        specialty: "Threat Intelligence & OSINT",
        missions: 32,
        successRate: "99.2%",
        bio: "Ex-Mossad Unit 8200. Fluent in 8 languages. Established our darkweb monitoring division. Has prevented 12 major attacks through early detection."
      },
      // ... more operatives
    };
    
    const data = profileData[operativeId] || profileData.carter;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'operative-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(10px);
    `;
    
    modal.innerHTML = `
      <div class="modal-content" style="
        background: rgba(15, 20, 40, 0.95);
        border: 2px solid var(--neon-cyan);
        border-radius: 10px;
        padding: 40px;
        max-width: 600px;
        width: 90%;
        position: relative;
        box-shadow: 0 0 50px rgba(0, 255, 255, 0.3);
      ">
        <button class="modal-close" style="
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: 1px solid var(--neon-pink);
          color: var(--neon-pink);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
        ">×</button>
        
        <h2 style="color: var(--neon-cyan); margin-bottom: 10px;">${data.name}</h2>
        <div style="display: flex; gap: 20px; margin-bottom: 30px;">
          <span style="background: rgba(0, 255, 255, 0.1); color: var(--neon-cyan); padding: 5px 15px; border-radius: 3px;">
            ${data.clearance} CLEARANCE
          </span>
          <span style="background: rgba(57, 255, 20, 0.1); color: var(--neon-green); padding: 5px 15px; border-radius: 3px;">
            ${data.specialty}
          </span>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
          <div style="text-align: center;">
            <div style="font-size: 2.5rem; color: var(--neon-cyan); font-family: 'Orbitron';">${data.missions}</div>
            <div style="color: var(--text-muted); font-size: 0.9rem;">MISSIONS</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 2.5rem; color: var(--neon-green); font-family: 'Orbitron';">${data.successRate}</div>
            <div style="color: var(--text-muted); font-size: 0.9rem;">SUCCESS RATE</div>
          </div>
        </div>
        
        <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 30px;">
          ${data.bio}
        </p>
        
        <div style="text-align: center;">
          <button class="btn-mission-assign" style="
            background: linear-gradient(45deg, var(--neon-cyan), var(--neon-green));
            color: black;
            border: none;
            padding: 12px 30px;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            margin-right: 15px;
          ">ASSIGN MISSION</button>
          <button class="btn-message" style="
            background: transparent;
            border: 1px solid var(--neon-pink);
            color: var(--neon-pink);
            padding: 12px 30px;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
          ">SEND MESSAGE</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
    
    // Mission assign button
    modal.querySelector('.btn-mission-assign')?.addEventListener('click', () => {
      alert(`MISSION ASSIGNED TO ${data.name}\nAwaiting confirmation...`);
      document.body.removeChild(modal);
    });
  }
  
  // ========== ARMORY TABS ==========
  const armoryTabs = document.querySelectorAll('.armory-tab');
  const armoryPanels = document.querySelectorAll('.armory-panel');
  
  armoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      
      // Update active tab
      armoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show corresponding panel
      armoryPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `${tabId}-weapons` || panel.id === `${tabId}-tools`) {
          panel.classList.add('active');
        }
      });
      
      // Special handling for classified tab
      if (tabId === 'classified') {
        showClassifiedAccess();
      }
    });
  });
  
  function showClassifiedAccess() {
    // Simulate access request
    const terminal = document.getElementById('footerTerminal');
    if (terminal) {
      const messages = [
        "> ACCESS REQUEST: CLASSIFIED ARMORY",
        "> VERIFYING CLEARANCE...",
        "> ERROR: INSUFFICIENT CLEARANCE LEVEL",
        "> REQUIRED: LEVEL-7 OR HIGHER",
        "> CONTACT COMMAND FOR ELEVATION"
      ];
      
      terminal.innerHTML = '';
      messages.forEach((msg, index) => {
        setTimeout(() => {
          const line = document.createElement('div');
          line.textContent = msg;
          line.style.color = index >= 2 ? '#ff0066' : '#39ff14';
          terminal.appendChild(line);
          terminal.scrollTop = terminal.scrollHeight;
        }, index * 500);
      });
    }
  }
  
  // ========== FACILITIES MAP INTERACTION ==========
  const mapPoints = document.querySelectorAll('.map-point');
  const facilityDetails = document.querySelector('.facility-details');
  
  const facilitiesData = {
    virginia: {
      name: "VIRGINIA HEADQUARTERS",
      description: "Primary command center. 24/7 operations. EMP-shielded. 50ft underground. Houses our quantum computing cluster and primary AI training servers.",
      stats: {
        operatives: 247,
        data: "14.2",
        uptime: "99.999%"
      }
    },
    berlin: {
      name: "BERLIN SOC",
      description: "European Security Operations Center. Monitors EU and Russian cyber threats. Specializes in financial sector protection.",
      stats: {
        operatives: 89,
        data: "8.7",
        uptime: "99.995%"
      }
    },
    singapore: {
      name: "SINGAPORE ASIA-PACIFIC HQ",
      description: "Asia-Pacific command. Focuses on APT groups and state-sponsored attacks. Houses our darkweb monitoring servers.",
      stats: {
        operatives: 142,
        data: "11.5",
        uptime: "99.997%"
      }
    },
    iceland: {
      name: "ICELAND DATA FORTRESS",
      description: "Geothermal-powered data center. Stores encrypted backups and threat intelligence. Physically isolated for maximum security.",
      stats: {
        operatives: 34,
        data: "42.8",
        uptime: "100%"
      }
    }
  };
  
  mapPoints.forEach(point => {
    point.addEventListener('click', function() {
      const facility = this.dataset.facility;
      const data = facilitiesData[facility];
      
      if (data && facilityDetails) {
        facilityDetails.innerHTML = `
          <h3>${data.name}</h3>
          <p class="facility-desc">${data.description}</p>
          <div class="facility-stats">
            <div class="facility-stat">
              <div class="stat-value">${data.stats.operatives}</div>
              <div class="stat-label">OPERATIVES</div>
            </div>
            <div class="facility-stat">
              <div class="stat-value">${data.stats.data}</div>
              <div class="stat-label">PETABYTES</div>
            </div>
            <div class="facility-stat">
              <div class="stat-value">${data.stats.uptime}</div>
              <div class="stat-label">UPTIME</div>
            </div>
          </div>
        `;
        
        // Highlight selected point
        mapPoints.forEach(p => p.classList.remove('selected'));
        this.classList.add('selected');
        
        // Add selected style
        const selectedStyle = `
          .map-point.selected .point-pulse {
            background: var(--neon-pink);
            box-shadow: 0 0 30px var(--neon-pink);
          }
        `;
        
        if (!document.querySelector('#selected-point-style')) {
          const style = document.createElement('style');
          style.id = 'selected-point-style';
          style.textContent = selectedStyle;
          document.head.appendChild(style);
        }
      }
    });
  });
  
  // ========== TIMELINE CAROUSEL ==========
  const timelineTrack = document.getElementById('timelineTrack');
  const timelinePrev = document.getElementById('timelinePrev');
  const timelineNext = document.getElementById('timelineNext');
  const timelineProgress = document.getElementById('timelineProgress');
  
  const timelineEvents = [
    {
      year: "2023",
      title: "FOUNDING",
      description: "AllSafe founded by former intelligence operatives. Initial focus on offensive defense."
    },
    {
      year: "2023 Q4",
      title: "FIRST AI MODELS",
      description: "Trained initial neural networks on 2TB of malware samples. Achieved 87% prediction accuracy."
    },
    {
      year: "2024 Q1",
      title: "FIRST MAJOR CLIENT",
      description: "Protected Fortune 500 company from ransomware attack. Neutralized threat in 47 minutes."
    },
    {
      year: "2024 Q3",
      title: "GLOBAL EXPANSION",
      description: "Opened SOCs in Berlin and Singapore. Achieved 24/7 global coverage."
    },
    {
      year: "2025",
      title: "AI BREAKTHROUGH",
      description: "Havoc AI platform deployed. Achieved 94% attack prediction accuracy."
    },
    {
      year: "2025 Q4",
      title: "QUANTUM RESEARCH",
      description: "Established quantum cryptography division. Began work on post-quantum encryption."
    },
    {
      year: "2026",
      title: "CYBER WARFARE",
      description: "Officially rebranded as cyber warfare firm. Expanded offensive capabilities."
    }
  ];
  
  let currentTimelineIndex = 0;
  
  function renderTimeline() {
    if (!timelineTrack) return;
    
    timelineTrack.innerHTML = '';
    
    timelineEvents.forEach((event, index) => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.dataset.year = event.year;
      
      item.innerHTML = `
        <h4>${event.title}</h4>
        <p>${event.description}</p>
      `;
      
      timelineTrack.appendChild(item);
    });
    
    updateTimelineProgress();
  }
  
  function updateTimelineProgress() {
    if (!timelineProgress) return;
    
    const progress = ((currentTimelineIndex + 1) / timelineEvents.length) * 100;
    timelineProgress.style.width = `${progress}%`;
    
    // Scroll timeline
    const itemWidth = 300; // Should match CSS
    const gap = 40;
    const scrollPosition = currentTimelineIndex * (itemWidth + gap);
    
    timelineTrack.style.transform = `translateX(-${scrollPosition}px)`;
  }
  
  if (timelinePrev && timelineNext) {
    timelinePrev.addEventListener('click', () => {
      if (currentTimelineIndex > 0) {
        currentTimelineIndex--;
        updateTimelineProgress();
      }
    });
    
    timelineNext.addEventListener('click', () => {
      if (currentTimelineIndex < timelineEvents.length - 1) {
        currentTimelineIndex++;
        updateTimelineProgress();
      }
    });
  }
  
  // Initialize timeline
  renderTimeline();
  
  // ========== FOOTER TERMINAL ==========
  const footerTerminal = document.getElementById('footerTerminal');
  
  if (footerTerminal) {
    const terminalMessages = [
      "> SECURE CHANNEL ESTABLISHED",
      "> ENCRYPTION: AES-256-GCM",
      "> CONNECTION: QUANTUM-RESISTANT",
      "> STATUS: ALL SYSTEMS NOMINAL",
      "> THREAT LEVEL: 04/10",
      "> LAST SCAN: NO ANOMALIES DETECTED"
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    
    function typeTerminalMessage() {
      if (messageIndex < terminalMessages.length) {
        if (charIndex === 0) {
          const line = document.createElement('div');
          footerTerminal.appendChild(line);
        }
        
        const currentLine = footerTerminal.lastChild;
        const message = terminalMessages[messageIndex];
        
        if (charIndex < message.length) {
          currentLine.textContent += message.charAt(charIndex);
          charIndex++;
          setTimeout(typeTerminalMessage, 30);
        } else {
          messageIndex++;
          charIndex = 0;
          setTimeout(typeTerminalMessage, 500);
        }
        
        footerTerminal.scrollTop = footerTerminal.scrollHeight;
      } else {
        // Reset after delay
        setTimeout(() => {
          footerTerminal.innerHTML = '';
          messageIndex = 0;
          charIndex = 0;
          setTimeout(typeTerminalMessage, 1000);
        }, 10000);
      }
    }
    
    // Start terminal
    setTimeout(typeTerminalMessage, 1000);
  }
  
  // ========== THREAT LEVEL SIMULATION ==========
  function updateThreatLevel(scrollPercent) {
    // In a real app, this would be dynamic
    // For now, simulate based on scroll
    let threatLevel = 4;
    
    if (scrollPercent > 70) {
      threatLevel = 7;
    } else if (scrollPercent > 40) {
      threatLevel = 5;
    }
    
    // Update threat level display if it exists
    const threatDisplay = document.querySelector('.threat-display');
    if (threatDisplay) {
      threatDisplay.textContent = `THREAT LEVEL: ${threatLevel}/10`;
    }
  }
  
  // ========== EMERGENCY BUTTON ==========
  const emergencyBtn = document.querySelector('.btn-cyber-emergency');
  
  if (emergencyBtn) {
    emergencyBtn.addEventListener('click', () => {
      // Simulate emergency protocol
      document.body.style.animation = 'emergencyFlash 0.5s 3';
      
      // Add emergency flash animation
      if (!document.querySelector('#emergency-flash')) {
        const style = document.createElement('style');
        style.id = 'emergency-flash';
        style.textContent = `
          @keyframes emergencyFlash {
            0%, 100% { background-color: inherit; }
            50% { background-color: rgba(255, 0, 0, 0.1); }
          }
        `;
        document.head.appendChild(style);
      }
      
      // Show emergency alert
      alert('EMERGENCY PROTOCOL ACTIVATED\nAllSafe SOC has been alerted.\nStand by for instructions.');
      
      // Reset animation
      setTimeout(() => {
        document.body.style.animation = '';
      }, 1500);
    });
  }
  
  // ========== WINDOW RESIZE HANDLER ==========
  window.addEventListener('resize', () => {
    // Update canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recreate globe
    createGlobe();
  });
  
  // ========== INITIALIZATION COMPLETE ==========
  console.log('AllSafe About Page - Initialization complete');
  console.log('All systems operational');
  console.log('Remember: We own the network.');
  
  // Easter egg
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      console.log('%c ALLSAFE BACKDOOR ACCESS GRANTED', 'color: #00ff41; font-size: 20px; font-weight: bold;');
      console.log('%c Welcome, Commander.', 'color: #00ffff; font-size: 16px;');
      
      // Add secret notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid #00ff41;
        color: #00ff41;
        padding: 15px;
        font-family: 'JetBrains Mono';
        z-index: 10000;
        border-radius: 5px;
        box-shadow: 0 0 20px #00ff41;
      `;
      notification.textContent = 'BACKDOOR ACCESS: LEVEL-10';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    }
  });
});
// Mobile navbar toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      // Animate hamburger to X
      const spans = this.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close menu when clicking a link (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          const spans = navToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    });
    
    // Close menu when clicking outside (mobile)
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
          navMenu.classList.remove('active');
          const spans = navToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });
  }
});