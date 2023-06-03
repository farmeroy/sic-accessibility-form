import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.quizSection.create({
    data: {
      title: "Physical Accessibility",
      items: {
        createMany: {
          data: [
            {
              content:
                "Our workplace is fully accessible for people who use mobility aids (e.g. wider doorways, obstruction-free corridors, ramp access, lifts to all floors).",
              label: "mobility aids",
            },
            {
              content:
                "Our essential facilities (e.g. toilets, reception, printers) are on the main floor of our workplace.",
              label: "essential facilities",
            },
            {
              content:
                "We have accessible breakout spaces for employees with appropriate facilities (e.g. accessible seats, sensory spaces).",
              label: "breakout spaces",
            },
            {
              content:
                "We have flexible and remote working policies, with true flexibility of core business hours.",
              label: "flexible work",
            },
            {
              content:
                " Our service points offer the same experience for disabled and non-disabled people (e.g. mid-height counters).",
              label: "service points",
            },
            {
              content:
                "Our employee and customer toilets comply with disability access guidelines.",
              label: "toilets",
            },
            {
              content:
                "We provide assistive hardware for our employees or customers (e.g. adjustable desks and lighting, adaptive chairs, hearing loops, large print keyboards).",
              label: "assistive hardware",
            },
            {
              content:
                "Our signage is short, easy to read and clearly signposts people to specific areas within our workspace.",
              label: "signage",
            },
            {
              content:
                " We have different versions of our printed materials with larger text, alternative colour combinations, etc.",
              label: "printed materials",
            },
            {
              content:
                "We have enough accessible parking for employees and customers.",
              label: "parking",
            },
            {
              content:
                "Our workplace is close to an accessible public transport link OR we have an accessible taxi service we book on behalf of customers or employees.",
              label: "public transport",
            },
            {
              content:
                "We understand and use the government Access To Work Scheme.",
              label: "access to work schema",
            },
          ],
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
