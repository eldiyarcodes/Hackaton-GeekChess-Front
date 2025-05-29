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
import { useLogin } from '../model/use-login';

export function LoginForm() {
  const form = useForm({ resolver: zodResolver(authSchema) });

  const { login, isPending } = useLogin();

  return (
    <Form {...form}>
      <form
        className='w-full flex flex-col items-center gap-[15px] py-[50px] px-[80px]'
        onSubmit={form.handleSubmit(login)}
      >
        <div className='text-white text-3xl mb-[15px]'>{'Registration'}</div>
        <FormField
          control={form.control}
          name='login'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-[20px] mb-2'>Name:</FormLabel>
              <FormControl>
                <Input
                  placeholder='RenamedUser_228'
                  {...field}
                  className='h-[55px] rounded-md bg-[#24262d] text-white placeholder:text-gray-400 px-4 text-base border border-gray-700 focus:outline focus:outline-[#f5d91f]'
                />
              </FormControl>
              <FormMessage className='text-red-500 text-sm mt-1 -mb-2' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='telephone'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-[20px] mb-2'>Phone number:</FormLabel>
              <FormControl>
                <Input
                  type='tel'
                  placeholder='+996500210023'
                  {...field}
                  className='h-[55px] rounded-md bg-[#24262d] text-white placeholder:text-gray-400 px-4 text-base border border-gray-700 focus:outline focus:outline-[#f5d91f]'
                />
              </FormControl>
              <FormMessage className='text-red-500 text-sm mt-1 -mb-2' />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type='submit'
          className='w-full mt-4 h-[44px] rounded-[10px] bg-[#f5d91f] text-black font-medium text-base hover:bg-[#f0b700] transition-colors'
        >
          Sign in
        </Button>
      </form>
    </Form>
  );
}
