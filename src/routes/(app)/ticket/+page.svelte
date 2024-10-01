<div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70">
  <div class="bg-primary rounded-lg w-fit text-center">
    <div class="text-white text-xl font-semibold p-4">Create Agent</div>
    <hr class="border-t-8 border-secondary " />


    <div class="grid grid-cols-10 items-center p-2 my-2 text-left">
      <div class="col-span-7 gap-2 mx-2">
        <div class="grid grid-cols-7 items-center py-2">
          <label for="" class="text-secondary col-span-3 text-lg font-light">Name</label>
          <input type="text" class="col-span-4 text-lg font-light text-secondary h-10 w-full bg-lightBlue rounded leading-tight" />
        </div>

        <div class="grid grid-cols-7 items-center py-2">
          <label for="" class="text-secondary col-span-3 text-lg font-light">Voice</label>
          <select class="text-lg col-span-4 font-light appearance-none text-center text-secondary h-10 w-full bg-lightBlue rounded leading-tight" id="grid-state">
            <option>Avatar Default</option>
           
          </select>
        </div>

        <div class="grid grid-cols-7 items-center py-2">
          <label for="" class="text-secondary col-span-3 text-lg font-light">Visibility</label>
          <select class="text-lg col-span-4 font-light appearance-none text-center text-secondary h-10 w-full bg-lightBlue rounded leading-tight" id="grid-state">
            <option>Public</option>
            <option>Private</option>
      
          </select>
        </div>
      </div>

      <img src="./person.jpg" alt="" class="w-40 h-40 rounded-lg m-2 col-span-3 " />
    

    
    </div>
  
   
    <!-- <div class="grid grid-cols-10 items-center  mx-2 text-left mb-4">
      <label for="" class="text-secondary col-span-3 text-lg font-light mx-2">Action</label>
      <select class="text-lg col-span-7 font-light text-secondary mr-2 h-10 w-full bg-lightBlue rounded leading-tight" id="grid-state">
        <option>New Mexico</option>
        <option>Missouri</option>
        <option>Texas</option>
      </select>
    </div>
  
   -->
  
   <div class="grid grid-cols-10 items-center mx-2 text-left">
    <label for="description1" class="text-secondary col-span-3 text-lg font-light mx-2">Description</label>
    <textarea 
      id="description1"
      rows="2"
      placeholder="In just a few words, how would you describe this agent?"
      class="text-lg col-span-7 font-light text-secondary mr-2 h-20 w-full bg-lightBlue rounded leading-tight  ">
    </textarea>
  </div>
  
  <div class="grid grid-cols-10 items-center my-4 mx-2 text-left">
    <label for="description2" class="text-secondary col-span-3 text-lg font-light mx-2">Instruction</label>
    <textarea 
      id="description2"
      rows="7"
      placeholder="In just a few words, how would you describe this agent?"
      class="text-lg col-span-7 font-light text-secondary mr-2 h-40 w-full bg-lightBlue rounded leading-tight">
    </textarea>
  </div>
  <div class="flex justify-end gap-2 p-4">
    <button class="bg-lightBlue text-white py-2 px-4 rounded-lg ">Cancel</button>
    <button class="bg-secondary  py-2 px-4 rounded-lg">Accept</button>
  </div>
  

  </div>
</div>
