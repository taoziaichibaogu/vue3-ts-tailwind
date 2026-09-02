import cors from 'cors';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.json({ limit: '1mb' }));

const PORT = Number(process.env.PORT || 3000);
const DATA_FILE = path.join(__dirname, '../data/users.json');

function ok(data, message = 'OK') {
  return { code: '00000', message, data };
}

async function ensureSeed() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  }

  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  const list = JSON.parse(raw);
  if (Array.isArray(list) && list.length > 0) return;

  const now = new Date().toISOString();
  const seeded = Array.from({ length: 37 }).map((_, idx) => {
    const id = idx + 1;
    return {
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      createdAt: now,
      updatedAt: now,
    };
  });
  await fs.writeFile(DATA_FILE, JSON.stringify(seeded, null, 2), 'utf-8');
}

async function readUsers() {
  await ensureSeed();
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

async function writeUsers(list) {
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
}

// Health check
app.get('/api/health', (req, res) => {
  res.json(ok({ status: 'up' }));
});

// List users (pagination + keyword)
app.get('/api/users', async (req, res) => {
  const page = Number(req.query.page || 1);
  const pageSize = Number(req.query.size || 10);
  const keyword = String(req.query.keyword || '').trim().toLowerCase();

  const all = await readUsers();
  const filtered = keyword
    ? all.filter((u) => String(u.name).toLowerCase().includes(keyword) || String(u.email).toLowerCase().includes(keyword))
    : all;

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const list = filtered.slice(start, start + pageSize);

  res.json(
    ok({
      list,
      total,
      page,
      pageSize,
    }),
  );
});

// Get user
app.get('/api/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const all = await readUsers();
  const found = all.find((u) => Number(u.id) === id);
  if (!found) {
    res.status(404).json({ code: '404', message: 'Not Found', data: null });
    return;
  }
  res.json(ok(found));
});

// Create user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    res.status(400).json({ code: '400', message: 'Invalid payload', data: null });
    return;
  }

  const all = await readUsers();
  const id = all.length ? Math.max(...all.map((u) => Number(u.id))) + 1 : 1;
  const now = new Date().toISOString();
  const created = {
    id,
    name: String(name),
    email: String(email),
    createdAt: now,
    updatedAt: now,
  };
  await writeUsers([created, ...all]);
  res.json(ok(created, 'Created'));
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body || {};

  const all = await readUsers();
  const idx = all.findIndex((u) => Number(u.id) === id);
  if (idx < 0) {
    res.status(404).json({ code: '404', message: 'Not Found', data: null });
    return;
  }

  const now = new Date().toISOString();
  const next = {
    ...all[idx],
    name: name != null ? String(name) : all[idx].name,
    email: email != null ? String(email) : all[idx].email,
    updatedAt: now,
  };
  const newList = [...all.slice(0, idx), next, ...all.slice(idx + 1)];
  await writeUsers(newList);
  res.json(ok(next, 'Updated'));
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  const id = Number(req.params.id);
  const all = await readUsers();
  const newList = all.filter((u) => Number(u.id) !== id);
  await writeUsers(newList);
  res.json(ok(null, 'Deleted'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] http://localhost:${PORT}`);
});
