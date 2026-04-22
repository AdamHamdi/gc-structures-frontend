const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function logout(token: string) {
  await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getMe(token: string) {
  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// ── Services ──────────────────────────────────────────────────────────────────

export async function getServices() {
  const res = await fetch(`${API_URL}/services`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Erreur chargement services');
  return res.json();
}

// ── Références ────────────────────────────────────────────────────────────────

export async function getReferences() {
  const res = await fetch(`${API_URL}/references`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Erreur chargement références');
  return res.json();
}

// ── Équipe ────────────────────────────────────────────────────────────────────

export async function getTeam() {
  const res = await fetch(`${API_URL}/team`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Erreur chargement équipe');
  return res.json();
}

// ── Contact ───────────────────────────────────────────────────────────────────

export async function sendContact(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}) {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// ── CMS ───────────────────────────────────────────────────────────────────────

export async function getCmsPage(pageName: string) {
  const res = await fetch(`${API_URL}/cms/pages/${pageName}`, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error('Erreur chargement page CMS');
  return res.json();
}

export async function updateCmsSection(token: string, pageName: string, sectionId: string, content: object) {
  const res = await fetch(`${API_URL}/cms/pages/${pageName}/sections/${sectionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// ── Admin : Contact submissions ───────────────────────────────────────────────

export async function getContactSubmissions(token: string, status?: string) {
  const url = status ? `${API_URL}/contact?status=${status}` : `${API_URL}/contact`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function updateSubmissionStatus(token: string, id: number, status: string) {
  const res = await fetch(`${API_URL}/contact/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}
