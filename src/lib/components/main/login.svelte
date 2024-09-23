<script lang="ts">
    import { Button } from '$lib/components/ui/button/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
 </script>
 
<div class="w-full grid justify-items-center text-white bg-black py-12">
   <div class="flex items-center w-full px-4 justify-center">
     <div class="mx-auto grid gap-6">
       <div class="grid gap-2 text-center">
         <h1 class="text-2xl sm:text-3xl font-bold">Create Account</h1>
         <p class="text-muted-foreground text-balance">
           Enter your email below to create your account
         </p>
       </div>
       <form class="grid gap-4">
         <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div class="grid gap-2">
             <Label for="first-name">First Name</Label>
             <Input id="first-name" type="text" placeholder="Max" required class="text-black" />
           </div>
           <div class="grid gap-2">
             <Label for="last-name">Last Name</Label>
             <Input id="last-name" type="text" placeholder="Robinson" required class="text-black" />
           </div>
         </div>
         <div class="grid gap-2">
           <Label for="email">Email</Label>
           <Input id="email" type="email" placeholder="m@example.com" required class="text-black" />
         </div>
         <div class="grid gap-2">
           <div class="flex items-center">
             <Label for="password">Password</Label>
           </div>
           <Input id="password" type="password" required class="text-black" />
         </div>
         <div class="flex items-center space-x-2">
           <input
             id="include"
             type="checkbox"
             class="h-4 w-4 border border-white text-black"
           />
           <label
             for="include"
             class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
           >
             Agree to the terms of service
           </label>
         </div>
         <Button type="submit" class="w-full bg-slate-700">Create Account</Button>
       </form>
     </div>
   </div>
 </div>