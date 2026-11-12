import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowUp, Check, ChevronDown, CircleHelp, Code2, Copy,
  FileText, Globe2, Menu, MessageSquare, MoreHorizontal, Paperclip,
  Plus, Settings2, Sparkles, ThumbsDown, ThumbsUp, WandSparkles, X, Send
} from "lucide-react";
import "./styles.css";

const starterPrompts = [
  { icon: Code2, title: "Explain a code snippet", text: "Explain React useEffect with a simple example." },
  { icon: FileText, title: "Summarize a document", text: "Give me a concise summary of a project brief." },
  { icon: WandSparkles, title: "Improve my writing", text: "Rewrite this message to sound clear and professional." },
  { icon: Globe2, title: "Explore an idea", text: "Suggest a simple plan for learning a new frontend skill." }
];

function getDemoResponse(question, tone) {
  const q = question.toLowerCase();
  let answer = "";

  if (q.includes("useeffect") || q.includes("use effect")) {
    answer = `**What it does**
React's useEffect lets a component synchronize with something outside React, such as a timer, browser event, or API request.

**Example**
\`\`\`jsx
import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return <p>{time.toLocaleTimeString()}</p>;
}
\`\`\`

**How it works**
- The effect runs after rendering.
- The empty dependency array means it runs on mount.
- The cleanup function clears the timer when the component unmounts.

Use effects to synchronize with external systems, not to calculate values that can be derived during rendering.`;
  } else if (q.includes("what is react") || q.includes("react.js") || q === "react") {
    answer = `**React** is a JavaScript library for building user interfaces from reusable components.

**Key concepts**
- **Components:** Reusable pieces of UI.
- **JSX:** Syntax for describing UI in JavaScript.
- **Props:** Data passed from parent to child components.
- **State:** Data a component can update.
- **Hooks:** Functions such as useState and useEffect.

**Example**
\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

Here, Welcome is a component and name is a prop. React updates the UI when the data used by a component changes.`;
  } else if (q.includes("promise") || q.includes("promises")) {
    answer = `**What is a Promise?**
A JavaScript Promise represents the eventual result of an asynchronous operation, such as loading data from a server. A Promise can be **pending**, **fulfilled**, or **rejected**.

**Example using then() and catch()**
\`\`\`js
const userPromise = fetch("/api/user");

userPromise
  .then(response => {
    if (!response.ok) throw new Error("Request failed");
    return response.json();
  })
  .then(user => console.log("User:", user))
  .catch(error => console.error("Error:", error));
\`\`\`

**How it works**
- \`fetch()\` returns a Promise immediately; the request completes later.
- The first \`.then()\` handles the HTTP response and returns parsed JSON.
- The next \`.then()\` receives that returned data.
- \`.catch()\` handles errors from the request or earlier handlers.

**The same flow with async/await**
\`\`\`js
async function loadUser() {
  try {
    const response = await fetch("/api/user");
    if (!response.ok) throw new Error("Request failed");
    const user = await response.json();
    console.log("User:", user);
  } catch (error) {
    console.error("Error:", error);
  }
}
\`\`\`

`;
  } else if (q.includes("async/await") || q.includes("async await") || q.includes("await")) {
    answer = `**What are async and await?**
\`async\` marks a function so it always returns a Promise. \`await\` pauses that function until a Promise settles, without blocking the browser's main thread.

**Example**
\`\`\`js
async function getProducts() {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("Could not load products");
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}
\`\`\`

**Key points**
- Use \`try/catch\` to handle rejected Promises.
- \`await\` can be used inside an async function (and at supported top-level module scopes).
- Use \`Promise.all()\` when independent asynchronous tasks can run together.
- Awaiting one task before starting another makes them run sequentially.`;
  } else if (q.includes("useState") || q.includes("use state") || q.includes("react hooks") || q.includes("hooks")) {
    answer = `**What are React Hooks?**
Hooks let function components use React features such as state and effects. Common examples are \`useState\` and \`useEffect\`.

**Example: useState**
\`\`\`jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(current => current + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

**How it works**
- \`useState(0)\` creates state with an initial value of zero.
- \`count\` is the current value; \`setCount\` requests an update.
- When state changes, React renders the component again.
- Call Hooks at the top level of a component or custom Hook, not inside conditions or loops.`;
  } else if (q.includes("javascript") || q.includes(" js") || q.startsWith("js")) {
    answer = `**JavaScript** is a programming language used to add behavior to websites. It also runs on servers and in development tools.

**Core concepts**
- Variables: const and let
- Functions and arrow functions
- Arrays, objects, map, and filter
- Asynchronous programming (Promises and async/await)
- DOM events and browser APIs

**Example**
\`\`\`js
const names = ["Ava", "Noah", "Mia"];
const greetings = names.map(name => \`Hello, \${name}!\`);
console.log(greetings);
\`\`\`

The map method creates a new array by transforming each item.`;
  } else if (q.includes("css") || q.includes("responsive") || q.includes("media quer")) {
    answer = `**Responsive design** makes an interface adapt to different screen sizes.

**Practical approach**
1. Start with a simple mobile layout.
2. Use CSS Grid or Flexbox for flexible layouts.
3. Add breakpoints when the content needs them.
4. Check text readability, touch targets, and horizontal overflow.

**Example**
\`\`\`css
.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

@media (max-width: 700px) {
  .cards { grid-template-columns: 1fr; }
}
\`\`\`

This changes the cards from three columns to one on narrower screens.`;
  } else if (q.includes("api") || q.includes("fetch") || q.includes("rest")) {
    answer = `**An API** lets software systems communicate. A REST API commonly exposes resources through HTTP endpoints.

**Frontend request flow**
1. Send a request to an endpoint.
2. Check whether the response succeeded.
3. Read the returned JSON.
4. Show loading, success, and error states.

**Example**
\`\`\`js
async function loadUsers() {
  const response = await fetch("/api/users");
  if (!response.ok) throw new Error("Could not load users");
  return response.json();
}
\`\`\`

A real application should also handle network failures and keep private credentials out of frontend code.`;
  } else if (q.includes("rewrite") || q.includes("writing") || q.includes("professional")) {
    answer = `**Writing improvement checklist**
- Put the main message first.
- Use direct, specific wording.
- Keep each paragraph focused.
- Remove repeated phrases.
- End with a clear next step.

**Example**
Before: "I am writing this mail to ask if you got any update regarding the position."

After: "I wanted to follow up and ask whether there are any updates on the position."

Share the text you want revised to see a sample edit.`;
  } else if (q.includes("summar") || q.includes("document") || q.includes("project brief")) {
    answer = `**A useful project brief summary includes**
1. **Objective:** What the project should achieve.
2. **Users:** Who the solution is for.
3. **Scope:** Main features and deliverables.
4. **Constraints:** Timeline, dependencies, and technical limits.
5. **Success criteria:** How the result will be evaluated.

This demo does not read uploaded documents. Paste text into a real connected assistant to summarize its actual contents.`;
  } else if (q.includes("frontend") || q.includes("learn") || q.includes("idea") || q.includes("roadmap")) {
    answer = `**A practical frontend learning path**
1. Strengthen HTML, CSS, JavaScript, and browser fundamentals.
2. Build reusable components with React.
3. Learn routing, forms, state, and API integration.
4. Add tests with React Testing Library or a similar tool.
5. Build and deploy a responsive project.
6. Review accessibility, performance, and maintainability.

**Portfolio idea:** Create a task manager with filtering, form validation, responsive layouts, and sample data.`;
  } else {
    answer = `**A practical starting point**
1. Define the outcome you want.
2. Break the problem into smaller steps.
3. Choose a simple implementation you can test.
4. Check accessibility, responsive behavior, and edge cases.
5. Refine based on the result.

For a more specific walkthrough, include the code, topic, or context you want Nova to explore.`;
  }

  if (tone === "Concise") answer = answer.split("\n\n").slice(0, 2).join("\n\n");
  if (tone === "Detailed") answer += "\n\n**Suggested next step**\nTry the example in a small project, change one part at a time, and observe the result.";
  return answer + "\n\n*Demo note: Nova uses topic-matched sample responses. It is not connected to a live AI model.*";
}

function formatMessage(text) {
  const lines = text.split("\n");
  const nodes = [];
  let code = [];
  let inCode = false;
  const inline = (line, key) => line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("**")) return <strong key={`${key}-${i}`}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`")) return <code key={`${key}-${i}`}>{part.slice(1, -1)}</code>;
    return part;
  });

  lines.forEach((line, i) => {
    if (line.startsWith("```")) {
      if (inCode) {
        nodes.push(<pre className="nova-code-block" key={`code-${i}`}><code>{code.join("\n")}</code></pre>);
        code = [];
      }
      inCode = !inCode;
    } else if (inCode) code.push(line);
    else if (!line.trim()) nodes.push(<div className="message-space" key={`space-${i}`} />);
    else if (line.startsWith("- ")) nodes.push(<div className="message-bullet" key={i}>• {inline(line.slice(2), i)}</div>);
    else nodes.push(<p key={i}>{inline(line, i)}</p>);
  });
  if (inCode && code.length) nodes.push(<pre className="nova-code-block" key="code-last"><code>{code.join("\n")}</code></pre>);
  return nodes;
}

function App() {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [activeChat, setActiveChat] = useState("New conversation");
  const [history, setHistory] = useState(["Frontend portfolio ideas", "React component patterns", "Writing a project summary"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [model, setModel] = useState("Nova Standard");
  const [tone, setTone] = useState("Balanced");
  const [toast, setToast] = useState("");

  const notify = (text) => {
    setToast(text);
    window.clearTimeout(window.__novaToast);
    window.__novaToast = window.setTimeout(() => setToast(""), 2300);
  };

  const sendMessage = (value = draft) => {
    const text = value.trim();
    if (!text) return;
    setMessages(old => [...old, { role: "user", text }, { role: "assistant", text: getDemoResponse(text, tone) }]);
    setDraft("");
    setActiveChat(text.length > 27 ? `${text.slice(0, 27)}…` : text);
    setHistory(old => [text.length > 30 ? `${text.slice(0, 30)}…` : text, ...old.filter(x => x !== text)].slice(0, 5));
  };

  const newChat = () => {
    setMessages([]);
    setDraft("");
    setActiveChat("New conversation");
    setMenuOpen(false);
  };

  return (
    <div className="nova-app">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="brand"><div className="brand-icon"><Sparkles size={18}/></div><span>nova<span className="brand-period">.</span></span></div>
        <button className="new-chat" onClick={newChat}><Plus size={16}/> New chat <span>⌘ K</span></button>
        <div className="side-caption">RECENT</div>
        <div className="history-list">
          {history.map((item, i) => <button key={`${item}-${i}`} className={`history-item ${activeChat === item ? "current" : ""}`} onClick={() => {setActiveChat(item); setMessages([{role:"user",text:item},{role:"assistant",text:getDemoResponse(item,tone)}]); setMenuOpen(false);}}><MessageSquare size={14}/><span>{item}</span></button>)}
        </div>
        <div className="sidebar-spacer"/>
        <div className="side-note"><div className="note-icon"><Activity size={16}/></div><div><b>Demo environment</b><small>Responses are simulated</small></div></div>
        <button className="settings-link" onClick={() => setShowSettings(true)}><Settings2 size={16}/> Settings</button>
        <div className="user-profile"><div className="user-avatar">DC</div><div><b>Dhanush Chimma</b><small>Portfolio workspace</small></div><MoreHorizontal size={17}/></div>
      </aside>
      <main className="workspace">
        <header className="topbar">
          <div className="top-left"><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={18}/></button><span className="breadcrumb">Workspace <span>/</span> <b>{activeChat}</b></span></div>
          <div className="top-right"><div className="model-chip"><span className="model-dot"/> {model} <ChevronDown size={14}/></div><button className="help-button" onClick={() => notify("Nova is a simulated AI assistant portfolio demo.")}><CircleHelp size={17}/></button></div>
        </header>
        <section className={`chat-area ${messages.length ? "has-messages" : ""}`}>
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="welcome-mark"><Sparkles size={26}/></div>
              <div className="welcome-label">YOUR AI WORKSPACE</div>
              <h1>Good ideas start<br/><em>with a conversation.</em></h1>
              <p>Ask a question, explore an idea, or get help turning a blank page into a first draft.</p>
              <div className="prompt-grid">
                {starterPrompts.map(({icon: Icon, title, text}) => <button className="prompt-card" key={title} onClick={() => sendMessage(text)}><span className="prompt-icon"><Icon size={17}/></span><b>{title}</b><small>{text}</small><ArrowUp size={14}/></button>)}
              </div>
            </div>
          ) : (
            <div className="conversation">
              <div className="conversation-heading"><span className="welcome-label">CONVERSATION</span><h2>{activeChat}</h2></div>
              {messages.map((msg, i) => <div className={`message-row ${msg.role}`} key={i}>
                <div className={`message-avatar ${msg.role}`}>{msg.role === "user" ? "DC" : <Sparkles size={16}/>}</div>
                <div className="message-content">
                  <div className="message-author">{msg.role === "user" ? "You" : "Nova"} <span>{msg.role === "assistant" ? "· Demo response" : ""}</span></div>
                  <div className="message-text">{msg.role === "assistant" ? formatMessage(msg.text) : <p>{msg.text}</p>}</div>
                  {msg.role === "assistant" && <div className="message-tools"><button onClick={() => {navigator.clipboard?.writeText(msg.text); notify("Response copied");}}><Copy size={13}/> Copy</button><button onClick={() => notify("Thanks for your feedback")}><ThumbsUp size={13}/></button><button onClick={() => notify("Thanks for your feedback")}><ThumbsDown size={13}/></button></div>}
                </div>
              </div>)}
              <div className="demo-disclaimer"><Sparkles size={13}/> Responses are simulated for this portfolio demonstration.</div>
            </div>
          )}
        </section>
        <div className="composer-wrap">
          <div className="composer">
            <textarea value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => {if (e.key === "Enter" && !e.shiftKey) {e.preventDefault(); sendMessage();}}} placeholder="Message Nova..." rows={2}/>
            <div className="composer-bottom"><div className="composer-tools"><button onClick={() => notify("File attachments are disabled in this demo")}><Paperclip size={16}/></button><span>Demo mode · No live AI connection</span></div><button className="send-button" disabled={!draft.trim()} onClick={() => sendMessage()} aria-label="Send message"><Send size={16}/></button></div>
          </div>
          <div className="composer-foot">Nova can make mistakes. Verify important information. <span>Built as a frontend portfolio demo.</span></div>
        </div>
      </main>
      {showSettings && <div className="modal-backdrop" onClick={() => setShowSettings(false)}><div className="settings-modal" onClick={e => e.stopPropagation()}><button className="close-modal" onClick={() => setShowSettings(false)}><X size={18}/></button><div className="settings-symbol"><Settings2 size={20}/></div><div className="welcome-label">PREFERENCES</div><h2>Workspace settings</h2><p>Adjust the demo assistant's display preferences.</p><label>Assistant preset<select value={model} onChange={e => setModel(e.target.value)}><option>Nova Standard</option><option>Nova Creative</option><option>Nova Focus</option></select></label><label>Response style<select value={tone} onChange={e => setTone(e.target.value)}><option>Balanced</option><option>Concise</option><option>Detailed</option></select></label><button className="save-settings" onClick={() => {setShowSettings(false);notify(`Preferences saved · ${tone}`);}}>Save preferences <Check size={15}/></button></div></div>}
      {toast && <div className="toast"><Check size={15}/>{toast}</div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
