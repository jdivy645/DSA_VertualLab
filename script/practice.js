// Practice page runtime: runs JS/HTML in sandboxed iframe and Python via Pyodide
let codeHistory = [];
let pyodide = null;
let pyodideLoading = false;

function appendOutput(text, isError = false){
  const out = document.getElementById('output');
  const prefix = isError ? 'Error: ' : '';
  out.textContent = out.textContent === '' || out.textContent === 'Output will appear here...' ? (prefix + text) : (out.textContent + '\n' + prefix + text);
}

async function ensurePyodide(){
  if(pyodide) return pyodide;
  if(pyodideLoading) return new Promise(resolve => {
    const iv = setInterval(()=>{ if(pyodide){ clearInterval(iv); resolve(pyodide); } }, 200);
  });
  pyodideLoading = true;
  appendOutput('Loading Python runtime (Pyodide), please wait...');
  try{
    await loadScript('https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js');
    pyodide = await window.loadPyodide({indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/'});
    appendOutput('Pyodide loaded. You can run Python code now.');
    return pyodide;
  }catch(e){
    appendOutput('Failed to load Pyodide: ' + e.message, true);
    throw e;
  }
}

function loadScript(src){
  return new Promise((resolve,reject)=>{
    const s = document.createElement('script');
    s.src = src;
    s.onload = ()=> resolve();
    s.onerror = (e)=> reject(new Error('Failed to load '+src));
    document.head.appendChild(s);
  });
}

function clearOutput(){
  const out = document.getElementById('output');
  out.textContent = '';
  const iframe = document.getElementById('html-output');
  iframe.style.display = 'none';
  iframe.srcdoc = '';
}

function createSandboxedIframe(){
  const iframe = document.createElement('iframe');
  iframe.setAttribute('sandbox','allow-scripts');
  iframe.style.width = '100%';
  iframe.style.height = '320px';
  iframe.className = 'output-iframe';
  return iframe;
}

function runJSInIframe(code){
  clearOutput();
  const wrapper = `<!doctype html><html><head><meta charset=\"utf-8\"></head><body>
  <pre id=\"console\" style=\"white-space:pre-wrap;font-family:monospace;\"></pre>
  <script>
    (function(){
      function send(msg){
        try{ parent.postMessage({type:'output', text: String(msg)}, '*'); }catch(e){}
      }
      // override console methods
      console.log = function(){ Array.from(arguments).forEach(a=> send(a)); };
      console.error = function(){ Array.from(arguments).forEach(a=> send('Error: '+a)); };
      window.onerror = function(msg,src,line){ send('Error: '+msg+' (line:'+line+')'); };
      try{
        ${code}
      }catch(e){ send('Error: '+e); }
    })();
  <\/script>
  </body></html>`;

  const iframe = createSandboxedIframe();
  const outPanel = document.getElementById('output-container');
  const htmlOutput = document.getElementById('html-output');
  // replace existing iframe
  htmlOutput.style.display = 'block';
  htmlOutput.replaceWith(iframe);
  iframe.id = 'html-output';

  window.addEventListener('message', handleIframeMessage);
  iframe.srcdoc = wrapper;
}

function handleIframeMessage(ev){
  if(!ev.data || ev.data.type !== 'output') return;
  appendOutput(String(ev.data.text));
}

async function runCode(){
  const code = document.getElementById('code').value;
  const lang = document.getElementById('language').value;
  codeHistory.push(code);
  clearOutput();

  if(lang === 'javascript'){
    // run JS in sandboxed iframe to avoid page pollution
    runJSInIframe(code);
  } else if(lang === 'html'){
    const iframe = document.getElementById('html-output');
    iframe.style.display = 'block';
    iframe.srcdoc = code;
    appendOutput('Rendered HTML in the output frame.');
  } else if(lang === 'python'){
    try{
      const py = await ensurePyodide();
      // redirect stdout
      py.runPython(`import sys\nfrom js import console\n`);
      // capture prints by replacing sys.stdout
      await py.runPythonAsync(`import sys, io\n_sys_stdout = sys.stdout\n_buffer = io.StringIO()\nsys.stdout = _buffer`);
      try{
        await py.runPythonAsync(code);
      }catch(e){
        const err = e.toString();
        appendOutput(err, true);
      }
      const printed = py.runPython('sys.stdout.getvalue()');
      appendOutput(printed === '' ? 'Python code executed.' : printed);
      // restore stdout
      py.runPython('sys.stdout = _sys_stdout');
    }catch(e){
      appendOutput('Python run error: ' + e.message, true);
    }
  } else {
    appendOutput('Unsupported language: ' + lang, true);
  }
}

function undoCode(){
  if(codeHistory.length > 1){
    codeHistory.pop();
    document.getElementById('code').value = codeHistory[codeHistory.length-1];
  } else {
    document.getElementById('code').value = '';
  }
}

function debugCode(){
  const lang = document.getElementById('language').value;
  if(lang === 'javascript'){
    appendOutput('Debug: Running with console logging enabled.');
    runCode();
  } else if(lang === 'python'){
    appendOutput('Debug for Python: errors will be displayed below.');
    runCode();
  } else {
    appendOutput('Debug available for JavaScript and Python only.');
  }
}

// Attach UI handlers
document.addEventListener('DOMContentLoaded', ()=>{
  const runBtn = document.getElementById('runBtn');
  const debugBtn = document.getElementById('debugBtn');
  const undoBtn = document.getElementById('undoBtn');
  const clearBtn = document.getElementById('clearBtn');
  const langSelect = document.getElementById('language');

  if(runBtn) runBtn.addEventListener('click', runCode);
  if(debugBtn) debugBtn.addEventListener('click', debugCode);
  if(undoBtn) undoBtn.addEventListener('click', undoCode);
  if(clearBtn) clearBtn.addEventListener('click', ()=>{ document.getElementById('code').value = ''; clearOutput(); });

  // store initial code
  const initial = document.getElementById('code').value || '';
  codeHistory.push(initial);

  // when language changes, clear output and adjust placeholder
  if(langSelect) langSelect.addEventListener('change', ()=>{
    clearOutput();
    const lang = langSelect.value;
    const codeEl = document.getElementById('code');
    if(lang === 'javascript') codeEl.value = "// JavaScript\nconsole.log('Hello from JS');";
    else if(lang === 'html') codeEl.value = "<!-- HTML -->\n<!doctype html>\n<html><body><h1>Hello</h1></body></html>";
    else if(lang === 'python') codeEl.value = "# Python\nprint('Hello from Python')";
  });
});