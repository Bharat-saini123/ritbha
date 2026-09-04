"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  projectType: string | null;
  budget: string | null;
  message: string;
  createdAt: string;
};

type Service = {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
};

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl: string | null;
};

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  isVisible: boolean;
};

type Category = {
  id: string;
  label: string;
  icon: string;
  skills: { id: string; name: string }[];
};

type AdminData = {
  messages: Message[];
  services: Service[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  categories: Category[];
};

type Tab = "overview" | "messages" | "services" | "portfolio" | "testimonials" | "skills";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "messages", label: "Inbox", icon: "✉" },
  { id: "services", label: "Services", icon: "▤" },
  { id: "portfolio", label: "Portfolio", icon: "◫" },
  { id: "testimonials", label: "Testimonials", icon: "✦" },
  { id: "skills", label: "Skills", icon: "⌘" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function StatCard({ label, value, detail, accent }: { label: string; value: number; detail: string; accent: string }) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-top">
        <span className="admin-label">{label}</span>
        <span className="admin-stat-dot" style={{ backgroundColor: accent }} />
      </div>
      <strong>{value}</strong>
      <span className="admin-muted">{detail}</span>
    </div>
  );
}

export default function AdminPanel({ initialData }: { initialData: AdminData }) {
  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [query, setQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const saveContent = async (type: string, id: string, values: Record<string, unknown>) => {
    const response = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id, ...values }),
    });
    if (!response.ok) throw new Error("Could not save changes");
    const { item } = await response.json();
    setData((current) => ({
      ...current,
      portfolio: type === "portfolio" ? current.portfolio.map((entry) => entry.id === id ? item : entry) : current.portfolio,
      testimonials: type === "testimonial" ? current.testimonials.map((entry) => entry.id === id ? item : entry) : current.testimonials,
      categories: type === "category" ? current.categories.map((entry) => entry.id === id ? item : entry) : current.categories,
    }));
  };

  const filteredMessages = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return data.messages;
    return data.messages.filter((message) =>
      [message.name, message.email, message.projectType, message.budget, message.message]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [data.messages, query]);

  const openMessages = () => {
    setActiveTab("messages");
    setQuery("");
  };

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand">
          <span className="admin-brand-mark">R</span>
          <span><strong>Ritbha</strong><small>Control room</small></span>
        </Link>
        <div className="admin-sidebar-rule" />
        <p className="admin-sidebar-heading">Workspace</p>
        <nav className="admin-nav" aria-label="Admin navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "admin-nav-item active" : "admin-nav-item"}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.id === "messages" && data.messages.length > 0 && <b>{data.messages.length}</b>}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <span className="admin-status"><i /> System online</span>
          <Link href="/" className="admin-back-link">← Back to website</Link>
        </div>
      </aside>

      <section className="admin-content">
        <header className="admin-topbar">
          <div>
            <span className="admin-kicker">Ritbha / Admin</span>
            <h1>{tabs.find((tab) => tab.id === activeTab)?.label}</h1>
          </div>
          <div className="admin-top-actions">
            <span className="admin-date">{new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(new Date())}</span>
            <Link href="/" className="admin-view-site">View site ↗</Link>
          </div>
        </header>

        {activeTab === "overview" && (
          <div className="admin-view">
            <div className="admin-welcome">
              <div>
                <span className="admin-kicker">Good to see you, Bharat</span>
                <h2>Your studio at a glance.</h2>
                <p>Keep an eye on leads, content and the pieces that make Ritbha move.</p>
              </div>
              <button className="admin-primary-button" onClick={openMessages}>Open inbox <span>→</span></button>
            </div>
            <div className="admin-stats-grid">
              <StatCard label="New enquiries" value={data.messages.length} detail="All contact submissions" accent="#f49b45" />
              <StatCard label="Services" value={data.services.length} detail="Published offerings" accent="#9ce3c2" />
              <StatCard label="Projects" value={data.portfolio.length} detail="Portfolio case studies" accent="#e9c46a" />
              <StatCard label="Skills" value={data.categories.reduce((total, category) => total + category.skills.length, 0)} detail={`${data.categories.length} skill groups`} accent="#df8b9a" />
            </div>
            <div className="admin-overview-grid">
              <div className="admin-panel-card admin-activity-card">
                <div className="admin-card-heading"><div><span className="admin-kicker">Latest activity</span><h3>Recent enquiries</h3></div><button className="admin-text-button" onClick={openMessages}>See all →</button></div>
                {data.messages.length === 0 ? <EmptyState text="No enquiries yet. They will appear here when someone uses the contact form." /> : data.messages.slice(0, 4).map((message) => (
                  <button className="admin-activity-row" key={message.id} onClick={() => setSelectedMessage(message)}>
                    <span className="admin-avatar">{message.name.charAt(0).toUpperCase()}</span>
                    <span className="admin-activity-copy"><strong>{message.name}</strong><small>{message.projectType || "General enquiry"} · {formatDate(message.createdAt)}</small></span>
                    <span className="admin-row-arrow">↗</span>
                  </button>
                ))}
              </div>
              <div className="admin-panel-card admin-health-card">
                <div className="admin-card-heading"><div><span className="admin-kicker">Content health</span><h3>What is live</h3></div><span className="admin-live-pill">LIVE</span></div>
                <HealthRow label="Services" value={initialData.services.length} />
                <HealthRow label="Portfolio projects" value={data.portfolio.length} />
                <HealthRow label="Testimonials" value={data.testimonials.filter((item) => item.isVisible).length} />
                <HealthRow label="Skill categories" value={data.categories.length} />
                <div className="admin-health-note">Public pages are reading directly from your database.</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="admin-view">
            <div className="admin-section-intro"><div><span className="admin-kicker">Lead pipeline</span><h2>Every conversation, in one place.</h2></div><span className="admin-count-label">{filteredMessages.length} result{filteredMessages.length === 1 ? "" : "s"}</span></div>
            <div className="admin-search-wrap"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, email or project..." /></div>
            <div className="admin-message-list">
              {filteredMessages.length === 0 ? <EmptyState text={query ? "No messages match your search." : "No contact messages have arrived yet."} /> : filteredMessages.map((message) => (
                <button className="admin-message-row" key={message.id} onClick={() => setSelectedMessage(message)}>
                  <span className="admin-avatar large">{message.name.charAt(0).toUpperCase()}</span>
                  <span className="admin-message-main"><strong>{message.name}</strong><small>{message.email}</small></span>
                  <span className="admin-message-project">{message.projectType || "General enquiry"}</span>
                  <span className="admin-message-date">{formatDate(message.createdAt)}</span>
                  <span className="admin-row-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "services" && <CollectionView kicker="Offerings" title="Services" items={data.services.map((service) => ({ title: service.title, meta: service.price, description: service.description, tags: service.features }))} />}
        {activeTab === "portfolio" && <PortfolioView items={data.portfolio} onSave={saveContent} />}
        {activeTab === "testimonials" && <TestimonialsView items={data.testimonials} onSave={saveContent} />}
        {activeTab === "skills" && <SkillsView items={data.categories} onSave={saveContent} />}
      </section>

      {selectedMessage && <MessageDrawer message={selectedMessage} onClose={() => setSelectedMessage(null)} />}
    </main>
  );
}

function HealthRow({ label, value }: { label: string; value: number }) {
  return <div className="admin-health-row"><span>{label}</span><strong>{value}</strong></div>;
}

function EmptyState({ text }: { text: string }) {
  return <div className="admin-empty-state"><span>○</span><p>{text}</p></div>;
}

type SaveContent = (type: string, id: string, values: Record<string, unknown>) => Promise<void>;

function EditorField({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return <label className="admin-editor-field"><span>{label}</span>{multiline ? <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} /> : <input value={value} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function PortfolioView({ items, onSave }: { items: PortfolioItem[]; onSave: SaveContent }) {
  const [editing, setEditing] = useState<string | null>(null);
  return <div className="admin-view"><div className="admin-section-intro"><div><span className="admin-kicker">Selected work</span><h2>Portfolio</h2></div><span className="admin-count-label">{items.length} projects</span></div><div className="admin-collection-grid">
    {items.map((item) => <PortfolioEditor key={item.id} item={item} editing={editing === item.id} onEdit={() => setEditing(item.id)} onCancel={() => setEditing(null)} onSave={onSave} />)}
  </div></div>;
}

function PortfolioEditor({ item, editing, onEdit, onCancel, onSave }: { item: PortfolioItem; editing: boolean; onEdit: () => void; onCancel: () => void; onSave: SaveContent }) {
  const [values, setValues] = useState(item);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const update = (field: keyof PortfolioItem, value: string | string[] | null) => setValues((current) => ({ ...current, [field]: value }));
  const submit = async () => { setSaving(true); setError(""); try { await onSave("portfolio", item.id, values); onCancel(); } catch { setError("Save failed. Please try again."); } finally { setSaving(false); } };
  if (!editing) return <article className="admin-collection-card"><div className="admin-collection-top"><span className="admin-record-dot" /><span className="admin-meta">{item.category}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="admin-tag-list">{item.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="admin-text-button" onClick={onEdit}>Edit project →</button></article>;
  return <article className="admin-collection-card admin-editor-card"><h3>Edit project</h3><EditorField label="Title" value={values.title} onChange={(value) => update("title", value)} /><EditorField label="Category" value={values.category} onChange={(value) => update("category", value)} /><EditorField label="Description" value={values.description} onChange={(value) => update("description", value)} multiline /><EditorField label="Stack (comma separated)" value={values.stack.join(", ")} onChange={(value) => update("stack", value.split(",").map((tag) => tag.trim()).filter(Boolean))} /><EditorField label="Image URL" value={values.image} onChange={(value) => update("image", value)} /><EditorField label="Live URL" value={values.liveUrl ?? ""} onChange={(value) => update("liveUrl", value)} /><EditorActions saving={saving} error={error} onCancel={onCancel} onSave={submit} /></article>;
}

function TestimonialsView({ items, onSave }: { items: Testimonial[]; onSave: SaveContent }) {
  return <div className="admin-view"><div className="admin-section-intro"><div><span className="admin-kicker">Social proof</span><h2>Testimonials</h2></div><span className="admin-count-label">{items.filter((item) => item.isVisible).length} visible</span></div><div className="admin-collection-grid">{items.map((item) => <article className="admin-collection-card" key={item.id}><div className="admin-collection-top"><span className="admin-record-dot" /><span className="admin-meta">{item.role} · {item.company}</span></div><h3>{item.name}</h3><p>“{item.quote}”</p><label className="admin-switch"><input type="checkbox" checked={item.isVisible} onChange={(event) => onSave("testimonial", item.id, { isVisible: event.target.checked }).catch(() => undefined)} /><span>{item.isVisible ? "Shown on website" : "Hidden from website"}</span></label></article>)}</div></div>;
}

function SkillsView({ items, onSave }: { items: Category[]; onSave: SaveContent }) {
  const [editing, setEditing] = useState<string | null>(null);
  return <div className="admin-view"><div className="admin-section-intro"><div><span className="admin-kicker">Capabilities</span><h2>Skills</h2></div><span className="admin-count-label">{items.length} groups</span></div><div className="admin-collection-grid">{items.map((item) => <SkillEditor key={item.id} item={item} editing={editing === item.id} onEdit={() => setEditing(item.id)} onCancel={() => setEditing(null)} onSave={onSave} />)}</div></div>;
}

function SkillEditor({ item, editing, onEdit, onCancel, onSave }: { item: Category; editing: boolean; onEdit: () => void; onCancel: () => void; onSave: SaveContent }) {
  const [values, setValues] = useState({ label: item.label, icon: item.icon, skills: item.skills.map((skill) => skill.name).join(", ") });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const submit = async () => { setSaving(true); setError(""); try { await onSave("category", item.id, { label: values.label, icon: values.icon, skills: values.skills.split(",").map((skill) => skill.trim()).filter(Boolean) }); onCancel(); } catch { setError("Save failed. Please try again."); } finally { setSaving(false); } };
  if (!editing) return <article className="admin-collection-card"><div className="admin-collection-top"><span className="admin-record-dot" /><span className="admin-meta">{item.skills.length} skills</span></div><h3>{item.icon} {item.label}</h3><p>{item.skills.map((skill) => skill.name).join(" · ")}</p><button className="admin-text-button" onClick={onEdit}>Edit skills →</button></article>;
  return <article className="admin-collection-card admin-editor-card"><h3>Edit skill group</h3><EditorField label="Icon" value={values.icon} onChange={(value) => setValues({ ...values, icon: value })} /><EditorField label="Group name" value={values.label} onChange={(value) => setValues({ ...values, label: value })} /><EditorField label="Skills (comma separated)" value={values.skills} onChange={(value) => setValues({ ...values, skills: value })} multiline /><EditorActions saving={saving} error={error} onCancel={onCancel} onSave={submit} /></article>;
}

function EditorActions({ saving, error, onCancel, onSave }: { saving: boolean; error: string; onCancel: () => void; onSave: () => void }) {
  return <><div className="admin-editor-actions"><button className="admin-text-button" onClick={onCancel}>Cancel</button><button className="admin-primary-button" onClick={onSave} disabled={saving}>{saving ? "Saving..." : "Save changes"}</button></div>{error && <p className="admin-editor-error">{error}</p>}</>;
}

function CollectionView({ kicker, title, items }: { kicker: string; title: string; items: { title: string; meta: string; description: string; tags: string[] }[] }) {
  return (
    <div className="admin-view">
      <div className="admin-section-intro"><div><span className="admin-kicker">{kicker}</span><h2>{title}</h2></div><span className="admin-count-label">{items.length} published</span></div>
      <div className="admin-collection-grid">
        {items.map((item) => <article className="admin-collection-card" key={item.title}><div className="admin-collection-top"><span className="admin-record-dot" /><span className="admin-meta">{item.meta}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="admin-tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}
      </div>
    </div>
  );
}

function MessageDrawer({ message, onClose }: { message: Message; onClose: () => void }) {
  return <div className="admin-drawer-backdrop" onClick={onClose}><aside className="admin-drawer" onClick={(event) => event.stopPropagation()}><button className="admin-drawer-close" onClick={onClose} aria-label="Close message">×</button><span className="admin-kicker">Enquiry details</span><div className="admin-drawer-avatar">{message.name.charAt(0).toUpperCase()}</div><h2>{message.name}</h2><a href={`mailto:${message.email}`} className="admin-drawer-email">{message.email}</a><div className="admin-drawer-facts"><span><small>Project</small><strong>{message.projectType || "General enquiry"}</strong></span><span><small>Budget</small><strong>{message.budget || "Not specified"}</strong></span><span><small>Received</small><strong>{formatDate(message.createdAt)}</strong></span></div><div className="admin-drawer-message"><small>Message</small><p>{message.message}</p></div><a href={`mailto:${message.email}?subject=Re: Ritbha enquiry`} className="admin-primary-button drawer-button">Reply by email <span>↗</span></a></aside></div>;
}
