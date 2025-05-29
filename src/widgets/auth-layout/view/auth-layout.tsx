import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/kit/card';

export function AuthLayout({
  title,
  form,
  footerText,
}: {
  title: string;
  form: React.ReactNode;
  footerText: React.ReactNode;
}) {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Card className='w-[500px] rounded bg-[#393939] border-none'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className='px-[50px] py-[80px]'>{form}</CardContent>
        <CardFooter className='flex justify-center'>
          <p className='text-muted-foreground [&_a]:underline [&_a]:text-[##F5D91F]'>
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
