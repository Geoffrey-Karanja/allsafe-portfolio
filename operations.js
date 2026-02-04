// operations.js - WAR ROOM JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
  console.log('AllSafe War Room v5.1.3 initializing...');
  console.log('Loading tactical modules...');
  console.log('Remember: With great power comes great responsibility to deploy offensive cyber measures.');
  
  // ========== WAR ROOM INITIALIZATION ==========
  const warRoom = {
    version: '5.1.3',
    status: 'OPERATIONAL',
    threatLevel: 'CRITICAL',
    aiReadiness: 98,
    operativesActive: 247,
    activeWeapons: [],
    launchedOperations: [],
    sessionStart: new Date(),
    operator: '[CLASSIFIED]'
  };
  
  // ========== MATRIX OVERLAY ==========
  function createMatrixOverlay() {
    const overlay = document.getElementById('matrixOverlay');
    if (!overlay) return;
    
    // Create matrix code rain effect
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -9997;
      opacity: 0.03;
    `;
    
    overlay.appendChild(canvas);
    
    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~@";
    const charArray = chars.split('');
    const fontSize = 12;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height;
    }
    
    function drawMatrix() {
      // Semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 10, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px 'JetBrains Mono'`;
      
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Color based on position
        const greenIntensity = 0.3 + Math.random() * 0.7;
        ctx.fillStyle = `rgba(0, 255, 65, ${greenIntensity})`;
        
        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        // Move drop down
        drops[i]++;
        
        // Reset if beyond screen with random chance
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.random() * -100;
        }
      }
    }
    
    // Animation loop
    const matrixInterval = setInterval(drawMatrix, 35);
    
    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    
    return matrixInterval;
  }
  
  // ========== THREAT ALERT SYSTEM ==========
  const threatAlerts = {
    container: document.getElementById('threatAlerts'),
    alerts: [],
    maxAlerts: 5,
    
    createAlert: function(type, title, content, duration = 10000) {
      if (!this.container) return;
      
      // Remove oldest alert if at max
      if (this.alerts.length >= this.maxAlerts) {
        const oldestAlert = this.alerts.shift();
        if (oldestAlert && document.body.contains(oldestAlert.element)) {
          oldestAlert.element.style.animation = 'alertSlideOut 0.3s ease-out forwards';
          setTimeout(() => {
            if (document.body.contains(oldestAlert.element)) {
              this.container.removeChild(oldestAlert.element);
            }
          }, 300);
        }
      }
      
      const alertElement = document.createElement('div');
      alertElement.className = `threat-alert ${type}`;
      alertElement.innerHTML = `
        <div class="alert-header">
          <span class="alert-title">${title}</span>
          <span class="alert-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
          <button class="alert-close">&times;</button>
        </div>
        <div class="alert-content">${content}</div>
      `;
      
      this.container.appendChild(alertElement);
      
      // Add to alerts array
      const alertObj = {
        element: alertElement,
        timer: null
      };
      
      this.alerts.push(alertObj);
      
      // Auto-remove after duration
      alertObj.timer = setTimeout(() => {
        this.removeAlert(alertObj);
      }, duration);
      
      // Close button
      const closeBtn = alertElement.querySelector('.alert-close');
      closeBtn.addEventListener('click', () => {
        this.removeAlert(alertObj);
      });
      
      return alertObj;
    },
    
    removeAlert: function(alertObj) {
      if (!alertObj || !alertObj.element) return;
      
      clearTimeout(alertObj.timer);
      
      alertObj.element.style.animation = 'alertSlideOut 0.3s ease-out forwards';
      setTimeout(() => {
        if (document.body.contains(alertObj.element)) {
          this.container.removeChild(alertObj.element);
        }
      }, 300);
      
      // Remove from array
      const index = this.alerts.indexOf(alertObj);
      if (index > -1) {
        this.alerts.splice(index, 1);
      }
    },
    
    simulateThreats: function() {
      const threats = [
        {
          type: 'critical',
          title: 'RANSOMWARE DETECTED',
          content: 'Active encryption attack on financial sector. Multiple endpoints compromised.'
        },
        {
          type: 'warning',
          title: 'DDoS ATTACK IN PROGRESS',
          content: 'Traffic flood targeting client infrastructure. Mitigation active.'
        },
        {
          type: 'info',
          title: 'AI PREDICTION ALERT',
          content: 'HAVOC AI predicts phishing campaign in next 2 hours. Confidence: 87%.'
        },
        {
          type: 'critical',
          title: 'ZERO-DAY EXPLOIT ACTIVE',
          content: 'Unknown vulnerability being exploited. Containment protocols initiated.'
        },
        {
          type: 'warning',
          title: 'DARKWEB ACTIVITY SPIKE',
          content: 'Increased chatter about coordinated attack. Monitoring in progress.'
        }
      ];
      
      // Random threat every 30-60 seconds
      setInterval(() => {
        const threat = threats[Math.floor(Math.random() * threats.length)];
        this.createAlert(threat.type, threat.title, threat.content);
      }, 30000 + Math.random() * 30000);
      
      // Initial alerts
      setTimeout(() => {
        this.createAlert('critical', 'WAR ROOM ACTIVE', 'AllSafe War Room v5.1.3 online. Threat level: CRITICAL.', 5000);
      }, 1000);
      
      setTimeout(() => {
        this.createAlert('info', 'SYSTEMS CHECK', 'All defensive systems operational. AI readiness: 98%.', 5000);
      }, 3000);
    }
  };
  
  // ========== SATELLITE NAVIGATION ==========
  function initSatelliteNav() {
    const navItems = document.querySelectorAll('.sat-nav-item');
    const warSections = document.querySelectorAll('.war-section');
    
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        const targetId = this.dataset.target;
        
        // Update active nav item
        navItems.forEach(navItem => navItem.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding section
        warSections.forEach(section => {
          section.classList.remove('active');
          if (section.id === targetId) {
            section.classList.add('active');
            // Add entry animation
            section.style.animation = 'sectionFadeIn 0.5s ease';
          }
        });
        
        // Log section change
        console.log(`War Room: Switching to ${targetId.toUpperCase()} module`);
        
        // Special actions for specific sections
        if (targetId === 'launch') {
          threatAlerts.createAlert('warning', 'WEAPONS SYSTEM', 'Accessing weapons launch interface. Clearance verified.');
        } else if (targetId === 'intel') {
          threatAlerts.createAlert('info', 'INTELLIGENCE', 'Loading threat intelligence database. Processing 14.2TB of data.');
        }
      });
    });
  }
  
  // ========== DASHBOARD FUNCTIONS ==========
  function initDashboard() {
    // Quick Launch functionality
    const quickLaunchBtn = document.getElementById('quickLaunch');
    const launchOptions = document.querySelectorAll('.launch-option');
    
    let selectedWeapon = null;
    
    launchOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Remove selection from all options
        launchOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Select this option
        this.classList.add('selected');
        selectedWeapon = this.dataset.weapon;
        
        // Update button text
        const weaponName = this.querySelector('h4').textContent;
        quickLaunchBtn.innerHTML = `<i class="fas fa-play"></i> LAUNCH ${weaponName}`;
        
        console.log(`Weapon selected: ${selectedWeapon}`);
      });
    });
    
    quickLaunchBtn.addEventListener('click', () => {
      if (!selectedWeapon) {
        threatAlerts.createAlert('warning', 'NO WEAPON SELECTED', 'Please select a weapon system before launch.');
        return;
      }
      
      // Show launch confirmation
      threatAlerts.createAlert('critical', 'WEAPONS LAUNCH', `Initiating ${selectedWeapon.toUpperCase()} deployment sequence.`);
      
      // Simulate launch sequence
      const launchSequence = [
        `Arming ${selectedWeapon} system...`,
        'Target acquisition...',
        'Weapons systems online...',
        'Final authorization...',
        'LAUNCH CONFIRMED'
      ];
      
      const terminal = document.getElementById('commandTerminal');
      if (terminal) {
        launchSequence.forEach((line, index) => {
          setTimeout(() => {
            const lineElement = document.createElement('div');
            lineElement.textContent = `> ${line}`;
            lineElement.style.color = index === launchSequence.length - 1 ? '#39ff14' : '#00ffff';
            terminal.appendChild(lineElement);
            terminal.scrollTop = terminal.scrollHeight;
            
            // Last line - mission launched
            if (index === launchSequence.length - 1) {
              // Add to active operations
              addActiveOperation(selectedWeapon);
              
              // Update threat map
              simulateThreatNeutralization();
            }
          }, index * 800);
        });
      }
    });
    
    // AI Chat simulation
    const aiQueryInput = document.getElementById('aiQuery');
    const aiSendBtn = document.querySelector('.btn-send');
    
    function sendAIQuery() {
      const query = aiQueryInput.value.trim();
      if (!query) return;
      
      // Add user message
      const aiChat = document.querySelector('.ai-chat');
      const userMessage = document.createElement('div');
      userMessage.className = 'user-message';
      userMessage.innerHTML = `
        <div class="message-content">
          <div class="message-header">
            <span class="message-sender">OPERATOR</span>
            <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <p class="message-text">${query}</p>
        </div>
        <div class="message-avatar">
          <i class="fas fa-user"></i>
        </div>
      `;
      
      aiChat.appendChild(userMessage);
      
      // Clear input
      aiQueryInput.value = '';
      
      // Scroll to bottom
      aiChat.scrollTop = aiChat.scrollHeight;
      
      // AI response after delay
      setTimeout(() => {
        const aiResponse = generateAIResponse(query);
        const aiMessage = document.createElement('div');
        aiMessage.className = 'ai-message';
        aiMessage.innerHTML = `
          <div class="message-avatar">
            <i class="fas fa-brain"></i>
          </div>
          <div class="message-content">
            <div class="message-header">
              <span class="message-sender">HAVOC AI</span>
              <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <p class="message-text">${aiResponse}</p>
          </div>
        `;
        
        aiChat.appendChild(aiMessage);
        aiChat.scrollTop = aiChat.scrollHeight;
      }, 1000 + Math.random() * 2000);
    }
    
    aiSendBtn.addEventListener('click', sendAIQuery);
    aiQueryInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendAIQuery();
      }
    });
    
    // Command Terminal
    const terminalInput = document.getElementById('terminalInput');
    const commandTerminal = document.getElementById('commandTerminal');
    
    const terminalCommands = {
      help: 'Available commands: status, clear, threat, deploy, scan, lockdown, scramble, history, exit',
      status: `War Room Status:
      Version: ${warRoom.version}
      Threat Level: ${warRoom.threatLevel}
      AI Readiness: ${warRoom.aiReadiness}%
      Active Operatives: ${warRoom.operativesActive}
      Active Weapons: ${warRoom.activeWeapons.length}
      Session Start: ${warRoom.sessionStart.toLocaleTimeString()}`,
      clear: () => {
        if (commandTerminal) {
          commandTerminal.innerHTML = '';
          return 'Terminal cleared.';
        }
        return '';
      },
      threat: 'Current threat assessment: CRITICAL. 142 active threats detected. 12 escalating.',
      deploy: 'Weapons deployment interface required. Use dashboard or launch section.',
      scan: 'Initiating full network scan... Estimated completion: 3 minutes.',
      lockdown: 'Initiating full lockdown sequence. All external connections will be severed.',
      scramble: 'Activating communication scramble. All signals encrypted with quantum protocols.',
      history: `Recent operations:
      1. Operation PHANTOM STRIKE - Counter-espionage
      2. Operation MALWARE RECLAIM - Botnet takeover
      3. Operation DARKWEB STING - Infiltration
      4. Operation SENTINEL WATCH - 24/7 monitoring`,
      exit: 'War Room terminal cannot be exited. Session is permanent until lockdown.'
    };
    
    function processTerminalCommand(command) {
      const cmd = command.trim().toLowerCase();
      let response = '';
      
      if (cmd === 'clear') {
        response = terminalCommands.clear();
      } else if (terminalCommands[cmd]) {
        response = typeof terminalCommands[cmd] === 'function' 
          ? terminalCommands[cmd]() 
          : terminalCommands[cmd];
      } else if (cmd) {
        response = `Command not found: ${cmd}. Type 'help' for available commands.`;
      }
      
      return response;
    }
    
    terminalInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const command = terminalInput.value.trim();
        terminalInput.value = '';
        
        if (!command) return;
        
        // Add command to terminal
        const commandLine = document.createElement('div');
        commandLine.innerHTML = `<span style="color:#39ff14">root@warroom:~#</span> ${command}`;
        commandTerminal.appendChild(commandLine);
        
        // Process command and add response
        const response = processTerminalCommand(command);
        if (response) {
          const responseLine = document.createElement('div');
          responseLine.textContent = response;
          responseLine.style.color = '#00ffff';
          responseLine.style.marginBottom = '10px';
          commandTerminal.appendChild(responseLine);
        }
        
        // Scroll to bottom
        commandTerminal.scrollTop = commandTerminal.scrollHeight;
      }
    });
    
    // Initialize terminal with welcome message
    setTimeout(() => {
      if (commandTerminal) {
        const welcomeLines = [
          '> AllSafe War Room Terminal v5.1.3',
          '> Secure connection established',
          '> Encryption: Quantum-resistant',
          '> Threat Level: CRITICAL',
          '> Type "help" for available commands',
          ''
        ];
        
        welcomeLines.forEach(line => {
          const lineElement = document.createElement('div');
          lineElement.textContent = line;
          lineElement.style.color = line.includes('CRITICAL') ? '#ff0033' : '#00ffff';
          commandTerminal.appendChild(lineElement);
        });
      }
    }, 1000);
  }
  
  // ========== WEAPONS LAUNCH SYSTEM ==========
  function initWeaponsLaunch() {
    const weaponCategories = document.querySelectorAll('.weapon-category');
    const authorizeBtn = document.getElementById('authorizeLaunch');
    const executeBtn = document.getElementById('executeLaunch');
    const launchModal = document.getElementById('launchModal');
    const finalConfirmBtn = document.getElementById('finalConfirm');
    
    // Weapon data
    const weaponsData = {
      defensive: {
        name: 'DDoS COUNTERMEASURE SYSTEM',
        code: 'DCS-2026',
        description: 'Overwhelms attacker infrastructure with coordinated traffic floods. Uses reclaimed botnet nodes to turn attacker resources against them.',
        stats: {
          effectiveness: '94%',
          responseTime: '8.2s',
          collateralRisk: 'LOW',
          authorization: 'LEVEL-5'
        }
      },
      offensive: {
        name: 'HAVOC AI MALWARE PLATFORM',
        code: 'HMP-2025',
        description: 'Self-learning malware that adapts to defense systems. Can rewrite its own code in real-time to bypass protections.',
        stats: {
          effectiveness: '98%',
          responseTime: '2.4s',
          collateralRisk: 'MEDIUM',
          authorization: 'LEVEL-8'
        }
      },
      intel: {
        name: 'OMNISCIENCE THREAT PREDICTION',
        code: 'OTP-2026',
        description: 'Global threat prediction AI. Analyzes 1.4 million data points per second to forecast attacks 48 hours in advance.',
        stats: {
          effectiveness: '94%',
          responseTime: '0.8s',
          collateralRisk: 'NONE',
          authorization: 'LEVEL-6'
        }
      },
      ai: {
        name: 'NEURAL NETWORK INFILTRATION',
        code: 'NNI-2026',
        description: 'AI-powered network infiltration. Learns and mimics legitimate traffic patterns to bypass detection systems.',
        stats: {
          effectiveness: '96%',
          responseTime: '12.5s',
          collateralRisk: 'LOW',
          authorization: 'LEVEL-7'
        }
      },
      classified: {
        name: 'QUANTUM DECRYPTION ARRAY',
        code: 'QDA-2027',
        description: 'Classified weapon system. Uses quantum computing to break encryption in real-time. Details restricted.',
        stats: {
          effectiveness: 'CLASSIFIED',
          responseTime: 'CLASSIFIED',
          collateralRisk: 'CLASSIFIED',
          authorization: 'LEVEL-9'
        }
      }
    };
    
    // Weapon category selection
    weaponCategories.forEach(category => {
      category.addEventListener('click', function() {
        const categoryType = this.dataset.category;
        
        // Update active category
        weaponCategories.forEach(cat => cat.classList.remove('active'));
        this.classList.add('active');
        
        // Update weapon display
        const weapon = weaponsData[categoryType];
        updateWeaponDisplay(weapon);
        
        // Reset launch sequence
        resetLaunchSequence();
      });
    });
    
    function updateWeaponDisplay(weapon) {
      document.getElementById('weaponName').textContent = weapon.name;
      document.querySelector('.weapon-code').textContent = weapon.code;
      document.querySelector('.weapon-description p').textContent = weapon.description;
      
      // Update stats
      const statElements = document.querySelectorAll('.weapon-stat');
      const stats = Object.values(weapon.stats);
      
      statElements.forEach((statElement, index) => {
        const valueElement = statElement.querySelector('.stat-value');
        if (valueElement && stats[index]) {
          valueElement.textContent = stats[index];
        }
      });
    }
    
    function resetLaunchSequence() {
      // Reset sequence steps
      const sequenceSteps = document.querySelectorAll('.sequence-step');
      sequenceSteps.forEach(step => step.classList.remove('active'));
      sequenceSteps[0].classList.add('active');
      
      // Reset buttons
      executeBtn.disabled = true;
      
      // Reset checkboxes
      document.getElementById('stealthMode').checked = true;
      document.getElementById('autoTrace').checked = false;
      document.getElementById('counterAttack').checked = false;
      
      // Reset authorization
      authorizeBtn.disabled = false;
    }
    
    // Authorization button
    authorizeBtn.addEventListener('click', function() {
      // Update sequence
      const sequenceSteps = document.querySelectorAll('.sequence-step');
      sequenceSteps.forEach(step => step.classList.remove('active'));
      sequenceSteps[1].classList.add('active');
      
      // Simulate authorization process
      threatAlerts.createAlert('warning', 'AUTHORIZATION IN PROGRESS', 'Verifying commander credentials...');
      
      setTimeout(() => {
        sequenceSteps[2].classList.add('active');
        threatAlerts.createAlert('info', 'CREDENTIALS VERIFIED', 'Commander authorization confirmed. Level-9 clearance active.');
        
        setTimeout(() => {
          sequenceSteps[3].classList.add('active');
          this.disabled = true;
          executeBtn.disabled = false;
          
          threatAlerts.createAlert('success', 'WEAPONS ARMED', 'Launch sequence ready. Final confirmation required.');
        }, 1500);
      }, 1500);
    });
    
    // Execute button
    executeBtn.addEventListener('click', function() {
      // Get launch parameters
      const target = document.getElementById('targetInput').value || '[Not Specified]';
      const intensity = document.getElementById('intensitySlider').value;
      const weaponName = document.getElementById('weaponName').textContent;
      
      // Update modal details
      document.getElementById('modalWeapon').textContent = weaponName;
      document.getElementById('modalTarget').textContent = target;
      document.getElementById('modalIntensity').textContent = `${intensity}/10`;
      
      // Show modal
      launchModal.classList.add('active');
      
      // Reset confirmation checkboxes
      document.getElementById('confirmLegal').checked = false;
      document.getElementById('confirmAuthority').checked = false;
      document.getElementById('confirmTracking').checked = false;
      finalConfirmBtn.disabled = true;
    });
    
    // Modal close buttons
    document.querySelectorAll('.modal-close, .btn-modal.cancel').forEach(btn => {
      btn.addEventListener('click', () => {
        launchModal.classList.remove('active');
      });
    });
    
    // Confirmation checkboxes
    const confirmCheckboxes = document.querySelectorAll('.authorization-check input[type="checkbox"]');
    confirmCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const allChecked = Array.from(confirmCheckboxes).every(cb => cb.checked);
        finalConfirmBtn.disabled = !allChecked;
      });
    });
    
    // Final confirmation
    finalConfirmBtn.addEventListener('click', function() {
      // Close modal
      launchModal.classList.remove('active');
      
      // Get launch parameters
      const target = document.getElementById('targetInput').value;
      const intensity = document.getElementById('intensitySlider').value;
      const duration = document.getElementById('durationSelect').value;
      const stealthMode = document.getElementById('stealthMode').checked;
      const autoTrace = document.getElementById('autoTrace').checked;
      const counterAttack = document.getElementById('counterAttack').checked;
      const weaponName = document.getElementById('weaponName').textContent;
      
      // Simulate launch
      simulateWeaponLaunch({
        weapon: weaponName,
        target: target,
        intensity: parseInt(intensity),
        duration: parseInt(duration),
        stealthMode: stealthMode,
        autoTrace: autoTrace,
        counterAttack: counterAttack
      });
      
      // Reset interface
      resetLaunchSequence();
      document.getElementById('targetInput').value = '';
      document.getElementById('intensitySlider').value = 5;
    });
  }
  
  // ========== SIMULATION FUNCTIONS ==========
  function simulateWeaponLaunch(params) {
    console.log('Weapon launch simulated:', params);
    
    // Create mission
    const missionId = 'MISSION-' + Date.now().toString().slice(-6);
    const missionName = `Operation: ${params.weapon.split(' ')[0]} STRIKE`;
    
    // Add to active operations
    addActiveOperation(params.weapon, missionId);
    
    // Update threat map
    simulateThreatNeutralization();
    
    // Show success alert
    threatAlerts.createAlert('success', 'WEAPONS DEPLOYED', `${params.weapon} launched successfully. Mission ID: ${missionId}`);
    
    // Update terminal
    const terminal = document.getElementById('commandTerminal');
    if (terminal) {
      const lines = [
        `> WEAPON LAUNCH: ${params.weapon}`,
        `> TARGET: ${params.target || 'Automated targeting'}`,
        `> INTENSITY: ${params.intensity}/10`,
        `> DURATION: ${params.duration} seconds`,
        `> STEALTH MODE: ${params.stealthMode ? 'ACTIVE' : 'INACTIVE'}`,
        `> MISSION ID: ${missionId}`,
        `> STATUS: DEPLOYMENT SUCCESSFUL`
      ];
      
      lines.forEach((line, index) => {
        setTimeout(() => {
          const lineElement = document.createElement('div');
          lineElement.textContent = line;
          lineElement.style.color = index === lines.length - 1 ? '#39ff14' : '#00ffff';
          terminal.appendChild(lineElement);
          terminal.scrollTop = terminal.scrollHeight;
        }, index * 300);
      });
    }
    
    // Update war room stats
    warRoom.activeWeapons.push({
      id: missionId,
      weapon: params.weapon,
      launched: new Date(),
      status: 'ACTIVE'
    });
    
    // Simulate mission completion after duration
    setTimeout(() => {
      completeMission(missionId);
    }, params.duration * 1000);
  }
  
  function addActiveOperation(weaponType, missionId = null) {
    const opsList = document.querySelector('.ops-list');
    if (!opsList) return;
    
    const operationNames = {
      ddos: 'DDoS COUNTER STRIKE',
      honeypot: 'HONEYPOT DEPLOYMENT',
      decrypt: 'RANSOMWARE NEUTRALIZATION',
      trace: 'FULL SOURCE TRACE',
      havoc: 'HAVOC AI DEPLOYMENT'
    };
    
    const opName = operationNames[weaponType] || 'ACTIVE OPERATION';
    const mission = missionId || 'OP-' + Date.now().toString().slice(-6);
    
    const opItem = document.createElement('div');
    opItem.className = 'op-item';
    opItem.innerHTML = `
      <div class="op-icon">
        <i class="fas fa-crosshairs"></i>
      </div>
      <div class="op-details">
        <h5>${opName}</h5>
        <p>Active deployment • Mission: ${mission}</p>
      </div>
      <div class="op-status active"></div>
    `;
    
    // Add to beginning of list
    opsList.insertBefore(opItem, opsList.firstChild);
    
    // Limit to 4 visible operations
    const allOps = opsList.querySelectorAll('.op-item');
    if (allOps.length > 4) {
      opsList.removeChild(allOps[allOps.length - 1]);
    }
    
    // Add to war room records
    warRoom.launchedOperations.push({
      name: opName,
      mission: mission,
      startTime: new Date(),
      weaponType: weaponType
    });
  }
  
  function completeMission(missionId) {
    // Find and update operation status
    const ops = document.querySelectorAll('.op-item');
    ops.forEach(op => {
      if (op.querySelector('p').textContent.includes(missionId)) {
        op.querySelector('.op-status').className = 'op-status online';
        op.querySelector('p').textContent = 'Completed successfully';
        
        // Fade out after delay
        setTimeout(() => {
          op.style.opacity = '0.5';
        }, 3000);
      }
    });
    
    // Remove from active weapons
    const weaponIndex = warRoom.activeWeapons.findIndex(w => w.id === missionId);
    if (weaponIndex > -1) {
      warRoom.activeWeapons.splice(weaponIndex, 1);
    }
    
    // Update terminal
    const terminal = document.getElementById('commandTerminal');
    if (terminal) {
      const lineElement = document.createElement('div');
      lineElement.textContent = `> MISSION ${missionId}: COMPLETED SUCCESSFULLY`;
      lineElement.style.color = '#39ff14';
      terminal.appendChild(lineElement);
      terminal.scrollTop = terminal.scrollHeight;
    }
  }
  
  function simulateThreatNeutralization() {
    // Update threat map stats
    const mapStats = document.querySelectorAll('.map-stat .stat-value');
    if (mapStats.length >= 3) {
      const active = parseInt(mapStats[0].textContent);
      const neutralized = parseInt(mapStats[1].textContent);
      
      if (active > 0) {
        mapStats[0].textContent = (active - 1).toString();
        mapStats[1].textContent = (neutralized + 1).toString();
      }
    }
    
    // Add threat pulse to map
    const threatMap = document.getElementById('liveThreatMap');
    if (threatMap) {
      const threatTypes = ['ransomware', 'phishing', 'ddos', 'espionage'];
      const randomType = threatTypes[Math.floor(Math.random() * threatTypes.length)];
      
      const threatPulse = document.createElement('div');
      threatPulse.className = 'threat-pulse';
      threatPulse.style.cssText = `
        position: absolute;
        top: ${20 + Math.random() * 60}%;
        left: ${20 + Math.random() * 60}%;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: ${getThreatColor(randomType)};
        box-shadow: 0 0 20px ${getThreatColor(randomType)};
        animation: threatPulse 2s infinite;
        pointer-events: none;
        z-index: 1;
      `;
      
      threatMap.appendChild(threatPulse);
      
      // Remove after animation
      setTimeout(() => {
        if (threatPulse.parentNode) {
          threatPulse.parentNode.removeChild(threatPulse);
        }
      }, 2000);
    }
  }
  
  function getThreatColor(type) {
    switch(type) {
      case 'ransomware': return '#ff0033';
      case 'phishing': return '#ff5500';
      case 'ddos': return '#00ffff';
      case 'espionage': return '#9d00ff';
      default: return '#39ff14';
    }
  }
  
  function generateAIResponse(query) {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('threat') || queryLower.includes('attack')) {
      return "Analyzing current threat landscape... Detected 142 active threats. Ransomware attacks up 23% this week. Recommend increased monitoring on financial sector.";
    } else if (queryLower.includes('recommend') || queryLower.includes('advice')) {
      return "Based on current patterns: 1. Deploy additional honeypots in subnet 192.168.4.0/24 2. Update firewall rules for emerging APT patterns 3. Increase AI monitoring sensitivity by 15%";
    } else if (queryLower.includes('status') || queryLower.includes('system')) {
      return "All systems operational. AI readiness: 98%. Quantum cluster: 100%. Global sensors: 142/142 online. Threat intelligence database updated 2 minutes ago.";
    } else if (queryLower.includes('predict') || queryLower.includes('forecast')) {
      return "AI prediction: 78% probability of coordinated phishing campaign targeting finance sector within 48 hours. Confidence level: high. Recommended action: Deploy adaptive email filtering now.";
    } else {
      const responses = [
        "Analyzing query... Processing 1.4 million data points... Response formulated.",
        "Threat intelligence indicates increased activity in your query domain. Continue monitoring.",
        "Based on neural network analysis, recommend defensive posture elevation to level 3.",
        "Query processed. No immediate threats detected in related patterns.",
        "AI recommendation: Maintain current defensive measures. All systems optimal.",
        "Processing... Cross-referencing with darkweb intelligence... Analysis complete."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // ========== WAR ROOM FOOTER ==========
  function initWarRoomFooter() {
    // Update time
    function updateWarRoomTime() {
      const timeElement = document.getElementById('warRoomTime');
      if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toUTCString().split(' ')[4];
      }
    }
    
    updateWarRoomTime();
    setInterval(updateWarRoomTime, 1000);
    
    // Emergency buttons
    const lockdownBtn = document.getElementById('fullLockdown');
    const scrambleBtn = document.getElementById('scrambleComms');
    
    lockdownBtn?.addEventListener('click', () => {
      threatAlerts.createAlert('critical', 'FULL LOCKDOWN INITIATED', 'All external connections severed. Internal communications only. War Room isolated.');
      
      // Simulate lockdown
      const terminal = document.getElementById('commandTerminal');
      if (terminal) {
        const lines = [
          '> INITIATING FULL LOCKDOWN PROTOCOL',
          '> Severing external connections...',
          '> Isolating War Room from all networks...',
          '> Activating internal emergency power...',
          '> LOCKDOWN COMPLETE',
          '> War Room is now isolated from all external networks'
        ];
        
        lines.forEach((line, index) => {
          setTimeout(() => {
            const lineElement = document.createElement('div');
            lineElement.textContent = line;
            lineElement.style.color = '#ff0033';
            terminal.appendChild(lineElement);
            terminal.scrollTop = terminal.scrollHeight;
          }, index * 500);
        });
      }
    });
    
    scrambleBtn?.addEventListener('click', () => {
      threatAlerts.createAlert('warning', 'COMMUNICATIONS SCRAMBLED', 'All outgoing signals encrypted with quantum protocols. Eavesdropping impossible.');
      
      // Visual effect
      document.body.style.animation = 'scrambleEffect 0.5s';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 500);
    });
  }
  
  // ========== INITIALIZATION ==========
  function initWarRoom() {
    console.log('Initializing War Room systems...');
    
    // Create matrix overlay
    createMatrixOverlay();
    
    // Initialize all systems
    initSatelliteNav();
    initDashboard();
    initWeaponsLaunch();
    initWarRoomFooter();
    
    // Start threat simulation
    setTimeout(() => {
      threatAlerts.simulateThreats();
    }, 2000);
    
    // Add CSS for animations
    if (!document.querySelector('#war-room-styles')) {
      const styles = document.createElement('style');
      styles.id = 'war-room-styles';
      styles.textContent = `
        @keyframes threatPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
        
        @keyframes scrambleEffect {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(180deg); }
        }
        
        @keyframes success {
          0%, 100% { color: #39ff14; }
          50% { color: #00ffff; }
        }
      `;
      document.head.appendChild(styles);
    }
    
    console.log('War Room initialization complete.');
    console.log('All systems operational. Threat level: CRITICAL.');
    console.log('Operator: [CLASSIFIED]');
    console.log('Session start:', warRoom.sessionStart.toISOString());
  }
  
  // ========== START WAR ROOM ==========
  initWarRoom();
  
  // ========== GLOBAL KEYBOARD SHORTCUTS ==========
  document.addEventListener('keydown', (e) => {
    // Ctrl+Alt+L for lockdown
    if (e.ctrlKey && e.altKey && e.key === 'L') {
      e.preventDefault();
      document.getElementById('fullLockdown')?.click();
    }
    
    // Ctrl+Alt+S for scramble
    if (e.ctrlKey && e.altKey && e.key === 'S') {
      e.preventDefault();
      document.getElementById('scrambleComms')?.click();
    }
    
    // Ctrl+Alt+D for dashboard
    if (e.ctrlKey && e.altKey && e.key === 'D') {
      e.preventDefault();
      document.querySelector('.sat-nav-item[data-target="dashboard"]')?.click();
    }
    
    // Ctrl+Alt+W for weapons
    if (e.ctrlKey && e.altKey && e.key === 'W') {
      e.preventDefault();
      document.querySelector('.sat-nav-item[data-target="launch"]')?.click();
    }
    
    // Easter egg: Konami code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    function checkKonamiCode(key) {
      if (key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          // Konami code activated!
          threatAlerts.createAlert('info', 'EASTER EGG ACTIVATED', 'AllSafe War Room developer mode enabled.');
          console.log('%c ALLSAFE DEVELOPER MODE ENABLED', 'color: #00ff41; font-size: 24px; font-weight: bold;');
          console.log('%c Access granted to all systems.', 'color: #00ffff; font-size: 16px;');
          
          // Show secret notification
          const notification = document.createElement('div');
          notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            border: 3px solid #00ff41;
            color: #00ff41;
            padding: 30px;
            font-family: 'JetBrains Mono';
            z-index: 10000;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 0 50px #00ff41;
          `;
          notification.innerHTML = `
            <h2 style="margin-bottom: 15px;">DEVELOPER MODE</h2>
            <p>All systems unlocked.</p>
            <p>Access level: ROOT</p>
            <p style="margin-top: 15px; font-size: 0.9rem; color: #00ffff;">The kraken thanks you for your service.</p>
          `;
          document.body.appendChild(notification);
          
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 5000);
          
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    }
    
    checkKonamiCode(e.key);
  });
  
  // ========== EXPORT FOR DEBUGGING ==========
  window.warRoom = warRoom;
  window.threatAlerts = threatAlerts;
  
  console.log('War Room ready. All systems green.');
  console.log('Press Ctrl+Alt+L for lockdown, Ctrl+Alt+S for scramble.');
  console.log('For fun: Try the Konami code ↑↑↓↓←→←→BA');
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