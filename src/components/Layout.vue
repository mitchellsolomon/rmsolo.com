<template>
  <div class="flex flex-col h-screen bg-white">
    <header class="font-extrabold text-lg py-5">
      <nav class="flex justify-around items-center">
        <ul class="flex items-center">
          <li class="px-3">
            <a class="">home</a>
          </li>
          <li class="px-3">
            <a>projects</a>
          </li>
          <li class="px-3">
            <a>resume</a>
          </li>
        </ul>

        <ul class="flex items-center justify-center">
          <li class="px-3">
            <a href="https://github.com/mitchellsolomon">github</a>
          </li>
        </ul>
      </nav>
    </header>

    <main class="flex items-center h-full">
      <div class="flex flex-grow justify-center items-center">
        <div>
          <!-- <img
            height="250"
            width="250"
            src="/src/assets/me.jpg"
            class="rounded-full"
          /> -->
          <div class="h-[250px] w-[250px] bg-black rounded-full" />
        </div>
        <div class="pl-10">
          <h1 class="text-4xl font-extrabold ">
            Hi, I&apos;m Mitchell Solomon
          </h1>
          <p class="pt-2">
            Software Developer
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
