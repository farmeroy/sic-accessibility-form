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
  await prisma.quizSection.create({
    data: {
      title: "Digital Accessibility",
      items: {
        createMany: {
          data: [
            {
              content:
                "We have an accessibility statement on our website which clearly explains how we can cater to a variety of needs.",
              label: "accessibility statement",
            },
            {
              content:
                "Our marketing and social media content is accessible (e.g. ‘camel case’ hashtags, image descriptions, subtitled videos).",
              label: "social media",
            },
            {
              content:
                "People can contact our business in different ways (e.g. phone, email, live chat, text or WhatsApp message).",
              label: "contact",
              checked: false,
            },
            {
              content:
                "We use accessibility checkers on all web pages and documents created for customers and employees.",
              label: "accessibility checkers",
            },
            {
              content:
                "We provide assistive technologies for our employees (e.g. screen readers, closed captions for online meetings).",
              label: "assistive technologies",
            },
            {
              content:
                "We have an inclusive customer journey and the experience of purchasing from / working with us is the same for disabled and non-disabled people.",
              label: "customer journey",
            },
            {
              content:
                "All internal and external company documents are readable by a screen reader, including job adverts.",
              label: "screen reader",
            },
            {
              content:
                "We provide an online attendance option for all our physical meetings and events.",
              label: "online attendance",
            },
            {
              content:
                "Our job application process enables alternative methods of application and interview (e.g. video and audio, sign language interpreters).",
              label: "job application process",
            },
            {
              content:
                "All images and PDFs on our intranet and external website are readable via screen reader.",
              label: "images-pdfs",
            },
            {
              content:
                "We subtitle or close caption all internal and external video and audio content.",
              label: "close captioning",
            },
          ],
        },
      },
    },
  });

  await prisma.quizSection.create({
    data: {
      title: "Accessible Culture",
      items: {
        createMany: {
          data: [
            {
              content:
                "We provide all our staff with training in working with their disabled and neurodiverse colleagues.",
              label: "staff training",
            },
            {
              content:
                "We provide our managers with training in managing disabled and neurodiverse team members with empathy.",
              label: "management training",
            },
            {
              content:
                "We have a well-being and mental health policy for employees.",
              label: "mental health",
            },
            {
              content:
                "We use case studies, marketing materials and imagery that reflect our diverse society.",
              label: "case studies and marketing",
            },
            {
              content:
                "We actively recruit team members with diverse needs and levels of ability.",
              label: "recruiting",
            },
            {
              content:
                "Our employees (including our leadership team) represent and reflect our diverse society.",
              label: "diverse team",
            },
            {
              content:
                "We have a non-biased job application process.We have a non-biased job application process.",
              label: "job application process",
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
