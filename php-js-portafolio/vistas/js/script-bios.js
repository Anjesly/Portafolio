// Líneas del BIOS a mostrar con los espaciados exactos
const biosLines = [
    { text: "Monster Modular BIOS v4.51PG, A HTML, JS, PHP & CSS Dev Ally", delay: 800 },
    { text: "Copyright (C) 2025-98, Carlos Pc's Soluciones, Inc.", delay: 700 },
    { text: "", delay: 300, isSpace: true },
    { text: "JavaScript BIOS Revision 1011 Beta 005", delay: 800 },
    { text: "", delay: 200, isSpace: true },
    { text: "Apache/2.4.58 (Win64) OpenSSL/3.1.3 PHP/8.2.12 Server", delay: 700 },
    { text: "Memory Test: ", delay: 0, isMemory: true },
    { text: "", delay: 200, isSpace: true },
    { text: "Detecting IDE Primary Master...", delay: 0, isDetect: true, detectText: "Detecting IDE Primary Master...", nextText: "Detecting IDE Secondary Master..." },
    { text: "", delay: 0, isDetect: true, detectText: "Detecting IDE Secondary Master..." },
  ];

  const biosDiv = document.getElementById('bios');
  let lineIndex = 0;
  let animationComplete = false;

  function printLine(line, callback) {
    if (line.isSpace) {
      const div = document.createElement('div');
      div.className = 'spacing';
      biosDiv.appendChild(div);
      setTimeout(callback, line.delay);
      return;
    }

    const div = document.createElement('div');
    div.className = 'bios-line';
    biosDiv.appendChild(div);

    // Animar Memory Test
    if (line.isMemory) {
      animateMemoryTest(div, callback);
      return;
    }
    // Animar Detecting IDE
    if (line.isDetect) {
      animateDetect(div, line.detectText, callback, line.nextText);
      return;
    }
    // Animación de escritura tipo BIOS
    let i = 0;
    function typeChar() {
      if (i <= line.text.length) {
        div.textContent = line.text.substring(0, i);
        i++;
        setTimeout(typeChar, 18 + Math.random() * 30);
      } else {
        setTimeout(callback, line.delay);
      }
    }
    typeChar();
  }

  function animateMemoryTest(div, callback) {
    let current = 0;
    const target = 262144;
    const step = Math.ceil(target / 60);
    function increment() {
      if (current < target) {
        current += step;
        if (current > target) current = target;
        div.innerHTML = `Memory Test: <span class="highlight">${current}K</span>`;
        setTimeout(increment, 16);
      } else {
        div.innerHTML = `Memory Test: <span class="highlight">${target}K</span> <span class="ok">OK</span>`;
        setTimeout(callback, 700);
      }
    }
    increment();
  }

  function animateDetect(div, text, callback, nextText) {
    let dots = 0;
    function animateDots() {
      div.textContent = text + '.'.repeat(dots);
      dots++;
      if (dots <= 3) {
        setTimeout(animateDots, 350);
      } else {
        // Si hay un siguiente texto (para la primera detección), animar la siguiente línea
        if (nextText) {
          setTimeout(callback, 400);
        } else {
          // Última línea completada
          animationComplete = true;
          setTimeout(callback, 700);
        }
      }
    }
    animateDots();
  }

  function showFooter() {
    document.getElementById('footer').style.display = 'block';
    // Esperar 3 segundos y redirigir a so.html
    setTimeout(function() {
      window.location.href = 'so';
    }, 3000);
  }

  // Secuencia principal
  function nextLine() {
    if (lineIndex < biosLines.length) {
      printLine(biosLines[lineIndex], nextLine);
      lineIndex++;
    } else {
      showFooter();
    }
  }

  // Iniciar animación
  nextLine();