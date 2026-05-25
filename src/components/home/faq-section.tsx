import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollAnimate } from "@/components/shared/scroll-animate";

const faqs = [
  { question: "本站主要内容是什么？", answer: "本站主要分享我的技术知识、最新产品动态和项目心得。" },
  { question: "会有哪些新项目吗？", answer: "目前正在进行的是 Builder For Web，一个基于 Vue3 + TypeScript 的前端框架，帮助用户创建网站、简历、博客等。" },
];

export function FaqSection() {
  return (
    <section className="bg-secondary py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              label="FAQs"
              title="常见问题"
              description="如有其他问题，请发送邮件至 jimi1126_mid@163.com。"
            />
          </div>
          <ScrollAnimate>
            <Accordion multiple>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}
