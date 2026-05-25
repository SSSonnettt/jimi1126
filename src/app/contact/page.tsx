import { Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/shared/section-heading";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
      <SectionHeading label="Contact" title="联系我" description="有项目想讨论？填写表单或直接发送邮件" />
      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" name="name" placeholder="你的名字" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">主题</Label>
                  <Input id="subject" name="subject" placeholder="项目类型或需求简述" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">内容</Label>
                  <Textarea id="message" name="message" rows={6} placeholder="请详细描述你的需求..." required />
                </div>
                <Button type="submit" size="lg">发送消息</Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">邮箱</h3>
                  <p className="text-sm text-muted-foreground">jimi1126_mid@163.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">位置</h3>
                  <p className="text-sm text-muted-foreground">中国</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground text-center">我会尽快回复，一般在 24 小时内。</p>
        </div>
      </div>
    </div>
  );
}
