import bcrypt from "bcryptjs";

const DAY = 24 * 60 * 60 * 1000;

const startOfToday = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
};

/**
 * @param {import("mongodb").Db} db
 * @param {{ email: string, password: string, fullName: string, role: "user" | "admin" }} account
 */
export async function ensureUser(db, { email, password, fullName, role }) {
  const users = db.collection("users");
  const existing = await users.findOne({ email });
  if (existing) return existing._id;

  const now = new Date();
  const { insertedId } = await users.insertOne({
    fullName,
    email,
    password: await bcrypt.hash(password, 12),
    passwordChangedAt: null,
    about: "",
    profileImage: "",
    role,
    createdAt: now,
    updatedAt: now,
  });
  return insertedId;
}

/**
 * @param {import("mongodb").Db} db
 * @param {{ adminPassword: string, demoPassword: string }} passwords
 */
export async function seedDemo(db, { adminPassword, demoPassword }) {
  const adminId = await ensureUser(db, {
    email: "admin@pdos.dev",
    password: adminPassword,
    fullName: "Demo Admin",
    role: "admin",
  });
  const demoId = await ensureUser(db, {
    email: "demo@pdos.dev",
    password: demoPassword,
    fullName: "Demo Kullanıcı",
    role: "user",
  });

  if (await db.collection("notes").findOne({ user: demoId })) return { adminId, demoId };

  const now = new Date();
  const today = startOfToday();

  await db.collection("notes").insertMany([
    {
      user: demoId,
      title: "useMemo ne zaman gerekir?",
      description: "Pahalı hesaplamaları render'lar arasında önbelleğe almak için.",
      category: "Frontend",
      subCategory: "React",
      sections: [
        {
          id: "s1",
          title: "Örnek",
          type: "code",
          content: "const total = useMemo(() => sum(items), [items]);",
          language: "javascript",
          items: [],
        },
        {
          id: "s2",
          title: "Kontrol listesi",
          type: "list",
          content: "",
          language: null,
          items: ["Önce ölç", "Bağımlılıkları doğru ver", "Gereksiz yere kullanma"],
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      user: demoId,
      title: "Mongo index stratejisi",
      description: "Sorgu desenine göre bileşik index sırası.",
      category: "Backend",
      subCategory: "MongoDB",
      sections: [],
      createdAt: new Date(now.getTime() - 1000),
      updatedAt: new Date(now.getTime() - 1000),
    },
  ]);

  await db.collection("goals").insertOne({
    user: demoId,
    title: "Portfolyo projesini yayınla",
    category: "work-goals",
    status: "active",
    items: [
      { title: "Auth ve güvenlik", value: 30 },
      { title: "Testler", value: 25 },
      { title: "Deploy", value: 0 },
    ],
    createdAt: now,
    updatedAt: now,
  });

  const { insertedId: meetingId } = await db.collection("meetings").insertOne({
    createdBy: adminId,
    title: "Sprint planlama",
    color: "green",
    meeting: "10:00",
    meetingDetails: "Haftalık planlama toplantısı",
    meetingCalendar: today,
    createdAt: now,
    updatedAt: now,
  });

  const task = (overrides) => ({
    meeting: meetingId,
    assignee: demoId,
    createdBy: adminId,
    legacyId: null,
    description: "",
    label: "Frontend",
    priority: "medium",
    status: "todo",
    date: today,
    startDate: today,
    dueDate: new Date(today.getTime() + 3 * DAY),
    estimatedHours: 3,
    spentHours: 0,
    progress: 0,
    storyPoints: 2,
    completedAt: null,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  });

  const { insertedIds } = await db
    .collection("tasks")
    .insertMany([
      task({ title: "Login sayfası erişilebilirlik taraması", priority: "high" }),
      task({ title: "Kanban optimistic update", status: "in-progress", label: "Frontend" }),
      task({ title: "Rate limiter testleri", status: "done", label: "Backend", completedAt: now }),
    ]);

  await db.collection("notifications").insertMany(
    Object.values(insertedIds).map((taskId) => ({
      user: demoId,
      task: taskId,
      meeting: meetingId,
      type: "task-assigned",
      title: "Yeni görev atandı",
      message: "Size yeni bir görev atandı.",
      read: false,
      createdAt: now,
      updatedAt: now,
    })),
  );

  return { adminId, demoId };
}
