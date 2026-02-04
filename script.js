// ================= MATRIX RAIN CANVAS =================
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const chars = matrixChars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for(let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
    
    function drawMatrix() {
      ctx.fillStyle = 'rgba(10, 10, 22, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px 'JetBrains Mono'`;
      
      for(let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    
    setInterval(drawMatrix, 35);
    
    // ================= NAVBAR SCROLL EFFECT =================
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar-cyber');
      if(window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // ================= THREAT MAP =================
    const threatMap = document.querySelector('.threat-map-container');
    const threatColors = ['#ff0066', '#ffaa00', '#00ffff', '#9d00ff', '#39ff14'];
    let threatCounts = { ransomware: 0, phishing: 0, ddos: 0, espionage: 0 };
    
    function createThreatPulse(type) {
      const pulse = document.createElement('div');
      pulse.className = 'threat-pulse';
      
      // Random position on map
      const left = 10 + Math.random() * 80;
      const top = 10 + Math.random() * 80;
      pulse.style.left = `${left}%`;
      pulse.style.top = `${top}%`;
      
      // Color based on threat type
      let color;
      switch(type) {
        case 'ransomware': color = '#ff0066'; threatCounts.ransomware++; break;
        case 'phishing': color = '#ffaa00'; threatCounts.phishing++; break;
        case 'ddos': color = '#00ffff'; threatCounts.ddos++; break;
        case 'espionage': color = '#9d00ff'; threatCounts.espionage++; break;
        default: color = threatColors[Math.floor(Math.random() * threatColors.length)];
      }
      
      pulse.style.color = color;
      pulse.title = `${type.toUpperCase()} attack detected`;
      
      threatMap.appendChild(pulse);
      
      // Remove after animation
      setTimeout(() => {
        if(pulse.parentNode) {
          pulse.parentNode.removeChild(pulse);
          threatCounts[type]--;
        }
      }, 2000);
      
      // Update counters
      document.getElementById('ransomwareCount').textContent = threatCounts.ransomware;
      document.getElementById('phishingCount').textContent = threatCounts.phishing;
      document.getElementById('ddosCount').textContent = threatCounts.ddos;
      document.getElementById('espionageCount').textContent = threatCounts.espionage;
    }
    
    // Generate random threats
    setInterval(() => {
      const types = ['ransomware', 'phishing', 'ddos', 'espionage'];
      const type = types[Math.floor(Math.random() * types.length)];
      createThreatPulse(type);
    }, 800);
    
    // Initial threats
    for(let i = 0; i < 15; i++) {
      setTimeout(() => {
        const types = ['ransomware', 'phishing', 'ddos', 'espionage'];
        const type = types[Math.floor(Math.random() * types.length)];
        createThreatPulse(type);
      }, i * 200);
    }
    
    // ================= LIVE STATS ANIMATION =================
    function animateCounter(elementId, targetValue, suffix = '') {
      const element = document.getElementById(elementId);
      let current = parseInt(element.textContent.replace(/[^\d]/g, '')) || 0;
      const increment = targetValue / 50;
      
      function update() {
        current += increment;
        if(current < targetValue) {
          element.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(update);
        } else {
          element.textContent = targetValue + suffix;
        }
      }
      update();
    }
    
    // Animate stats on load
    setTimeout(() => {
      animateCounter('threatsBlocked', 5247);
      animateCounter('responseTime', 1.8, 's');
      animateCounter('aiPredictions', 342);
    }, 1000);
    
    // Update threat level randomly
    setInterval(() => {
      const threatValue = document.getElementById('threatValue');
      const threatPercent = document.getElementById('threatPercent');
      const threatMeter = document.getElementById('threatMeter');
      
      const current = parseInt(threatValue.textContent);
      const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      const newValue = Math.max(1, Math.min(10, current + change));
      
      threatValue.textContent = newValue.toString().padStart(2, '0');
      const percent = 10 + newValue * 6;
      threatPercent.textContent = percent + '%';
      threatMeter.style.width = percent + '%';
      
      // Change color based on threat level
      if(newValue <= 3) {
        threatMeter.style.background = 'linear-gradient(90deg, var(--neon-green), #00cc00)';
      } else if(newValue <= 7) {
        threatMeter.style.background = 'linear-gradient(90deg, #ffaa00, #ff5500)';
      } else {
        threatMeter.style.background = 'linear-gradient(90deg, #ff0066, #ff0000)';
        threatValue.classList.add('blink');
      }
    }, 3000);
    
    // ================= TERMINAL SIMULATION =================
    const terminal = document.getElementById('liveTerminal');
    const terminalLines = [
      "> SYSTEM BOOT: AllSafe SOC v4.2.1",
      "> LOADING MODULES: ThreatHunter v3.4, ZeroDayDetect v2.8, DarkWebMonitor v1.9",
      "> INITIALIZING AI ANALYST: Neural network loaded with 8.2TB threat data",
      "> CONNECTING TO HONEYPOT NETWORK: 142 nodes across 38 countries",
      "> SCANNING GLOBAL NETWORKS: 15,842 endpoints, 342 cloud instances",
      "> DETECTED: Unusual SSH activity from IP 203.0.113.42 (North Korea)",
      "> ACTION: Deployed deceptive credentials, initiated trace",
      "> STATUS: Threat contained at firewall layer 7",
      "> AI PREDICTION: 78% probability of phishing campaign targeting finance sector",
      "> ACTION: Deploying adaptive email filtering rules",
      "> SYSTEM STATUS: All defenses nominal, threat level: 04/10",
      "> UPTIME: 99.97% | LAST INCIDENT: 4.2 hours ago"
    ];
    
    let currentLine = 0;
    let currentChar = 0;
    
    function typeTerminal() {
      if(currentLine < terminalLines.length) {
        if(currentChar === 0) {
          const lineElement = document.createElement('div');
          lineElement.className = 'terminal-line';
          terminal.appendChild(lineElement);
        }
        
        const lineElement = terminal.lastChild;
        const lineText = terminalLines[currentLine];
        
        if(currentChar < lineText.length) {
          lineElement.textContent += lineText.charAt(currentChar);
          currentChar++;
          setTimeout(typeTerminal, 10 + Math.random() * 20);
        } else {
          currentLine++;
          currentChar = 0;
          setTimeout(typeTerminal, 200);
        }
        
        terminal.scrollTop = terminal.scrollHeight;
      } else {
        // Add blinking cursor at the end
        const cursor = document.createElement('span');
        cursor.textContent = '_';
        cursor.className = 'blink';
        cursor.style.color = '#39ff14';
        terminal.appendChild(cursor);
        
        // Restart after delay
        setTimeout(() => {
          terminal.innerHTML = '';
          currentLine = 0;
          currentChar = 0;
          setTimeout(typeTerminal, 1000);
        }, 15000);
      }
    }
    
    // Start terminal
    setTimeout(typeTerminal, 2000);
    
    // ================= BUTTON INTERACTIONS =================
    document.getElementById('launchDemo').addEventListener('click', () => {
      // Add war room simulation to terminal
      const warRoomLines = [
        "> WAR ROOM ACTIVATED",
        "> DEPLOYING TACTICAL AI: Loading combat modules",
        "> SCANNING FOR ACTIVE THREATS: 12 threat actors identified",
        "> ENGAGING COUNTERMEASURES: Deploying honeyfiles, false credentials",
        "> AI PREDICTION: Threat neutralization in 8.3 seconds",
        "> STATUS: AllSafe is on the offensive"
      ];
      
      warRoomLines.forEach((line, i) => {
        setTimeout(() => {
          const lineElement = document.createElement('div');
          lineElement.className = 'terminal-line';
          lineElement.style.color = '#ff5500';
          lineElement.textContent = line;
          terminal.appendChild(lineElement);
          terminal.scrollTop = terminal.scrollHeight;
        }, i * 500);
      });
      
      // Animate stats
      animateCounter('threatsBlocked', 5247 + Math.floor(Math.random() * 100));
      document.getElementById('threatValue').textContent = '07';
      document.getElementById('threatPercent').textContent = '52%';
      document.getElementById('threatMeter').style.width = '52%';
    });
    
    document.getElementById('deployCountermeasures').addEventListener('click', () => {
      const lines = [
        "> DEPLOYING COUNTERMEASURES ACROSS ALL NETWORKS",
        "> ACTIVATING DECEPTION TECHNOLOGY: 142 honeypots deployed",
        "> DEPLOYING FAKE CREDENTIALS TO TRAP THREAT ACTORS",
        "> ENGAGING ACTIVE DEFENSE: Redirecting attacker traffic to sandboxes",
        "> STATUS: Countermeasures deployed successfully",
        "> EXPECTED RESULT: Attacker frustration increased by 300%"
      ];
      
      lines.forEach((line, i) => {
        setTimeout(() => {
          const lineElement = document.createElement('div');
          lineElement.className = 'terminal-line';
          lineElement.style.color = '#ff0066';
          lineElement.textContent = line;
          terminal.appendChild(lineElement);
          terminal.scrollTop = terminal.scrollHeight;
        }, i * 400);
      });
    });
    
    document.getElementById('runVirusScan').addEventListener('click', () => {
      const lines = [
        "> INITIATING DEEP NETWORK SCAN",
        "> SCANNING: 15,842 endpoints, 2,431 servers, 894 cloud instances",
        "> PROGRESS: ████████████ 24%",
        "> DETECTED: 3 potential anomalies",
        "> ANALYZING: Anomaly #1 appears to be false positive",
        "> STATUS: Network clean. No active threats detected."
      ];
      
      lines.forEach((line, i) => {
        setTimeout(() => {
          const lineElement = document.createElement('div');
          lineElement.className = 'terminal-line';
          lineElement.style.color = '#39ff14';
          lineElement.textContent = line;
          terminal.appendChild(lineElement);
          terminal.scrollTop = terminal.scrollHeight;
        }, i * 600);
      });
    });
    
    document.getElementById('clearTerminal').addEventListener('click', () => {
      terminal.innerHTML = '';
      currentLine = 0;
      currentChar = 0;
      setTimeout(typeTerminal, 500);
    });
    
    // ================= UPTIME COUNTER =================
    setInterval(() => {
      const uptimeElement = document.getElementById('uptime');
      let current = parseFloat(uptimeElement.textContent);
      const change = (Math.random() - 0.5) * 0.001;
      const newValue = Math.max(99.95, Math.min(100, current + change));
      uptimeElement.textContent = newValue.toFixed(2) + '%';
    }, 5000);
    
    // ================= RESPONSE TIME ANIMATION =================
    setInterval(() => {
      const responseElement = document.getElementById('responseTime');
      let current = parseFloat(responseElement.textContent);
      const change = (Math.random() - 0.5) * 0.1;
      const newValue = Math.max(1.5, Math.min(2.5, current + change));
      responseElement.textContent = newValue.toFixed(1) + 's';
    }, 3000);
    
    // ================= WINDOW RESIZE =================
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    
    // ================= INITIALIZE =================
    console.log('AllSafe Cyber Warfare Interface v4.2 initialized');
    console.log('Threat level: 04 | System status: OPERATIONAL');
    console.log('Remember: We attack the attackers.');
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