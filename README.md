# FuelEU Maritime Compliance Platform 🚢🌍

A modern, full-stack platform empowering shipping companies to **seamlessly manage FuelEU Maritime compliance**. This solution enables efficient route management, automated emissions and GHG intensity calculations, real-time compliance monitoring, and optimization of both vessel- and fleet-level strategies—all in an intuitive, responsive interface.

---

## 🌟 Why FuelEU Maritime Compliance Platform?

European maritime regulations are evolving—and compliance is critical, but often complex and time-consuming. This platform is designed for **shipping professionals and compliance teams** who want:

- **Confidence:** Automated, always-up-to-date calculations that minimize human error.
- **Clarity:** Real-time visualizations of compliance status and improvement opportunities.
- **Control:** Advanced tools for banking, pooling, and leveraging compliance surpluses.

Whether you manage a single vessel or an entire fleet, this platform simplifies compliance and drives smarter, data-backed decisions.

---

## ✨ Key Features

- **Voyage & Route Management:** Log, track, and compare voyages. Instantly visualize baselines and deviations.
- **Automated GHG/Compliance Calculations:** Calculate greenhouse gas intensity and compliance balances (CBs) effortlessly.
- **Banking:** Carry over surplus compliance and optimize for future reporting periods.
- **Pooling:** Offset non-compliance using surplus CBs across ships, maximizing fleet efficiency.
- **Interactive Analytics:** Compare multiple scenarios for costs, penalties, and savings.
- **AI-Accelerated Workflows:** Built-in intelligent agents assist with setup, troubleshooting, and daily tasks.
- **Modern, User-Centric UI:** Fast, responsive, and intuitive dashboards built with today's best technologies.

---

## 🏗 Architecture & Tech Stack

Built using **Hexagonal (Ports & Adapters) Architecture** for testability, flexibility, and clean separation between business logic and infrastructure.

**Backend:**
- Node.js (v18+), Express.js, TypeScript
- PostgreSQL, Prisma ORM

**Frontend:**
- React, Vite, Tailwind CSS, Axios

```
├── backend/
│   └── src/
│       ├── core/           # Domain logic: Entities, Services, Ports
│       ├── adapters/       # Implementations: Controllers, Repositories
│       └── infrastructure/ # Express config, Prisma, utilities
├── frontend/
│   └── src/
│       ├── core/           # Domain types/interfaces
│       ├── adapters/       # UI components, API clients
│       └── ...
```



## 🚦 Getting Started

**Prerequisites:**  
- Node.js (≥ v18), PostgreSQL, Git

**1. Clone the repository**
```bash
git clone <repository-url>
cd <repository-directory>
```

**2. Backend Setup**
```bash
cd backend
npm install
```
- Create `.env` with:
  ```
  DATABASE_URL="postgresql://user:password@localhost:5432/fueleu_db?schema=public"
  PORT=3000
  ```
- Database migration & seed:
  ```bash
  npx prisma migrate dev --name init
  npm run prisma:seed
  ```
- Start server:
  ```bash
  npm run dev
  ```
  Access at [http://localhost:3000](http://localhost:3000)  
  ![Backend Screenshot](https://github.com/user-attachments/assets/fa06dd5c-ccef-4d34-8f70-38c678b2a9bb)

**3. Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
```
View at [http://localhost:5173](http://localhost:5173)

---

## 🖼 Product Showcase

**Route Management**  
_Smart route visualization and baseline comparison._
![Route Management](https://github.com/user-attachments/assets/ad8b39f5-2cb3-45ee-a863-7460f05fb4ec)

**Compliance Comparison**  
_Instant insights into GHG intensity and cost impact._
![Compliance Comparison](https://github.com/user-attachments/assets/3834c1a0-bb61-43cc-afc4-d69c2ef7d4dc)

**Banking**  
_Track and bank surplus compliance for the future._
![Banking](https://github.com/user-attachments/assets/20ef1cc6-acb0-4721-a6f3-b4fed4389ea7)

**Pooling**  
_Seamlessly allocate compliance balances within your fleet._
![Pooling](https://github.com/user-attachments/assets/53e1a129-98f8-4e8a-a7ef-a8bf79884663)

---

## 🤖 Agent-Powered Development

This project was rapidly prototyped and continually enhanced with AI agents. Dive into our transparent [AI agent workflow log](./AGENT_WORKFLOW.md) for prompt records, outputs, and decision traces.

---

## 👨‍💻 About the Developer

Developed by **Rathod Shanker**  
Email: [shankerr7780@gmail.com](mailto:shankerr7780@gmail.com)  
[LinkedIn](https://www.linkedin.com/in/shanker-rathod/) | [Portfolio](https://shanker.vercel.app/)  


