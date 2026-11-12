import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowDown, ArrowUp, Bot, Check, ChevronDown, CircleHelp,
  Code2, Copy, FileText, Globe2, Menu, MessageSquare, MoreHorizontal,
  Paperclip, Plus, Search, Send, Settings2, Sparkles, ThumbsDown,
  ThumbsUp, WandSparkles, X
} from "lucide-react";
import "./styles.css";

const starterPrompts = [
  { icon: Code2, title: "Explain a code snippet", text: "Explain React useEffect with a simple example." },
  { icon: FileText, title: "Summarize a document", text: "Give me a concise summary of a project brief." },
  { icon: WandSparkles, title: "Improve my writing", text: "Rewrite this message to sound clear and professional." },
  { icon: Globe2, title: "Explore an idea", text: "Suggest a simple plan for learning a new frontend skill." }
];

const responses = [
  "Here’s a practical way to approach that:\n\n1. **Start with the goal.** Identify the outcome you want and the audience.\n2. **Break it into smaller steps.** Keep each step focused and easy to verify.\n3. **Build a small example.** Test the idea with realistic sample data.\n4. **Review and refine.** Check clarity, accessibility, and edge cases.\n\nThis is a demonstration response from the Nova interface. It is not connected to a live AI model.",
  "A useful way to think about this is to keep the solution simple, measurable, and easy to maintain.\n\n- Define the expected result.\n- Choose the smallest useful implementation.\n- Test the main user journey.\n- Document any assumptions or limitations.\n\n*Demo note: Nova currently uses sample responses; no external AI service is connected.*",
  "Absolutely — here’s a concise starting point:\n\n**Recommended approach**\n\n- Clarify the requirements and constraints.\n- Sketch the user flow before coding.\n- Create reusable components for repeated patterns.\n- Validate the experience on desktop and mobile.\n\nYou can keep refining the prompt to explore another example. This assistant is a frontend portfolio demo with simulated replies."
];

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
    const reply = responses[messages.length % responses.length];
    setMessages((old) => [...old, { role: "user", text }, { role: "assistant", text: reply }]);
    setDraft("");
    setActiveChat(text.length > 27 ? `${text.slice(0, 27)}…` : text);
    setHistory((old) => [text.length > 30 ? `${text.slice(0, 30)}…` : text, ...old.filter((x) => x !== text)].slice(0, 5));
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
          {history.map((item, i) => <button key={`${item}-${i}`} className={`history-item ${activeChat === item ? "current" : ""}`} onClick={() => {setActiveChat(item); setMessages([{role:"user",text:item},{role:"assistant",text:responses[i % responses.length]}]); setMenuOpen(false);}}><MessageSquare size={14}/><span>{item}</span></button>)}
        </div>
        <div className="sidebar-spacer"/>
        <div className="side-note"><div className="note-icon"><Activity size={16}/></div><div><b>Demo environment</b><small>Responses are simulated</small></div></div>
        <button className="settings-link" onClick={() => setShowSettings(true)}><Settings2 size={16}/> Settings</button>
        <div className="user-profile"><div className="user-avatar">DC</div><div><b>Dhanush Chimma</b><small>Portfolio workspace</small></div><MoreHorizontal size={17}/></div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div className="top-left"><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={18}/></button><span className="breadcrumb">Workspace <span>/</span> <b>{activeChat}</b></span></div>
          <div className="top-right"><div className="model-chip"><span className="model-dot"/> {model} <ChevronDown size={14}/></div><button className="help-button" onClick={() => notify("This is a simulated AI assistant demo.")}><CircleHelp size={17}/></button></div>
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
              {messages.map((msg, i) => (
                <div className={`message-row ${msg.role}`} key={i}>
                  <div className={`message-avatar ${msg.role}`}>{msg.role === "user" ? "DC" : <Sparkles size={16}/>}</div>
                  <div className="message-content"><div className="message-author">{msg.role === "user" ? "You" : "Nova"} <span>{msg.role === "assistant" ? "· Demo response" : ""}</span></div><div className="message-text">{msg.text.split("\n").map((line, j) => <p key={j}>{line}</p>)}</div>
                    {msg.role === "assistant" && <div className="message-tools"><button onClick={() => {navigator.clipboard?.writeText(msg.text); notify("Response copied");}}><Copy size={13}/> Copy</button><button onClick={() => notify("Thanks for your feedback")}><ThumbsUp size={13}/></button><button onClick={() => notify("Thanks for your feedback")}><ThumbsDown size={13}/></button></div>}
                  </div>
                </div>
              ))}
              <div className="demo-disclaimer"><Sparkles size={13}/> Responses are simulated for this portfolio demonstration.</div>
            </div>
          )}
        </section>

        <div className="composer-wrap">
          <div className="composer">
            <textarea value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => {if (e.key === "Enter" && !e.shiftKey) {e.preventDefault(); sendMessage();}}} placeholder="Message Nova..." rows={2}/>
            <div className="composer-bottom"><div className="composer-tools"><button onClick={() => notify("File attachments are disabled in this demo")}><Paperclip size={16}/></button><span>Demo mode · No live AI connection</span></div><button className="send-button" disabled={!draft.trim()} onClick={() => sendMessage()} aria-label="Send message"><Send size={16}/></button></div>
          </div>
          <div className="composer-foot">Nova can make mistakes. Verify important information. <span>Built as a frontend portfolio demo.</span></div>
        </div>
      </main>

      {showSettings && <div className="modal-backdrop" onClick={() => setShowSettings(false)}><div className="settings-modal" onClick={(e) => e.stopPropagation()}><button className="close-modal" onClick={() => setShowSettings(false)}><X size={18}/></button><div className="settings-symbol"><Settings2 size={20}/></div><div className="welcome-label">PREFERENCES</div><h2>Workspace settings</h2><p>Adjust the demo assistant's display preferences.</p><label>Assistant preset<select value={model} onChange={(e) => setModel(e.target.value)}><option>Nova Standard</option><option>Nova Creative</option><option>Nova Focus</option></select></label><label>Response style<select value={tone} onChange={(e) => setTone(e.target.value)}><option>Balanced</option><option>Concise</option><option>Detailed</option></select></label><button className="save-settings" onClick={() => {setShowSettings(false);notify(`Preferences saved · ${tone}`);}}>Save preferences <Check size={15}/></button></div></div>}
      {toast && <div className="toast"><Check size={15}/>{toast}</div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
