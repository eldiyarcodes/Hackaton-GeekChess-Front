import { Button } from '@/shared/ui/kit/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authSchema } from '../lib/schema';
import { useRegister } from '../model/use-register';

export function RegisterForm() {
  const form = useForm({ resolver: zodResolver(authSchema) });

  const { register, isPending } = useRegister();

  return (
    <Form {...form}>
      <form
        className='flex flex-col items-center gap-[15px] py-[50px] px-[80px]'
        onSubmit={form.handleSubmit(register)}
      >
        <div className='text-white text-3xl mb-[15px]'>{'Registration'}</div>
        <FormField
          control={form.control}
          name='login'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name:</FormLabel>
              <FormControl>
                <Input placeholder='RenamedUser_228' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='telephone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number:</FormLabel>
              <FormControl>
                <Input type='tel' placeholder='+996500210023' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type='submit'
          className='cursor-pointer my-[15px]'
        >
          Sign in
        </Button>
      </form>
    </Form>
  );
}
