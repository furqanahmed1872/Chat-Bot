<div class="grid h-fit w-1/3 rounded-xl border bg-primary m-auto">
  <div class="text-secondary text-2xl font-normal text-center p-4">
    Create Agent
  </div>
  <hr class="border-0 h-3 bg-secondary my-2" />

  <div class="flex m-2 items-center">
    <div class="m-2 w-full items-center">
      <label class="text-secondary text-lg " for="name">Name</label>
      <input
        id="name"
        class="w-full rounded-sm p-1 bg-lightBlue my-1"
        type="text"
        required
      />
      <div class="w-full relative">
        <label class="text-secondary text-lg " for="name">Voice</label>
        <input
          type="text"
          id="readonly-input"
          value=" Avatar Default"
          readonly
          class="w-full bg-lightBlue rounded-sm my-1 text-secondary p-1 text-2xl font-light outline-none"
          placeholder=""
        />
        <button class="absolute inset-y-8 right-0  px-4 py-2">
          <img src="./play.png" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <img
      src="./person.jpg"
      class="rounded-lg border border-mediumBlue w-40 h-40 mx-2"
      alt=""
    />
  </div >
  <div class="px-4">
    <label class="text-secondary text-lg " for="name">Visibility</label>
    <select name="Public" id="visibility" class="w-full bg-lightBlue rounded-sm my-1 text-white p-1 text-2xl font-light outline-none">
      
      <option value="Public">Public</option>
      <option value="Private">Private</option>
    </select>
 </div>
 <div class="justify-center text-center m-4">
 <label class="text-secondary text-lg text-center" for="name">Description</label>
      <input
        id="name"
        placeholder="In just few words,how would you describe this agent ?"
        class="w-full rounded-sm p-3 bg-mediumBlue my-1 overflow-scroll"
        type="text"
        required
      />
  
      <label class="text-secondary text-lg text-center" for="name">Instruction</label>
      <input
        id="name"
        placeholder="Optional: Elaborate on the role if needed"
        class="w-full rounded-sm p-3 bg-mediumtBlue my-1 h-36"
        type="text"
        required
      />
    </div>

</div>
