<template>
  <div class="mx-2 lg:mx-auto my-8 lg:max-w-3xl sm:home-grid">
    <div class="mb-4 lg:mb-0 card">
      <h2 class="mb-2 text-lg text-grey-darker font-normal">Students with Equipment</h2>
      <radial-progress-bar
        :total="150"
        :assigned="100" />
    </div>
    <div class="mb-4 lg:mb-0 card flex flex-col">
      <h2 class="mb-2 text-lg text-grey-darker font-normal">Add New</h2>
      <div class="flex sm:add-new-grid h-full">
        <button
          class="py-6 sm:py-0 flex-1 flex flex-col items-center rounded hover:bg-yellow-lighter trans-bg-color"
          type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="mb-2 w-16 h-16 fill-current">
            <path
              class="heroicon-ui"
              d="M19 10h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2h-2a1 1 0 0 1 0-2h2V8a1 1 0 0 1 2 0v2zM9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2z" />
          </svg>
          <span class="a">Add New Student</span>
        </button>
        <button
          class="py-6 sm:py-0 flex-1 flex flex-col items-center rounded hover:bg-purple-lighter trans-bg-color"
          type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="mb-2 w-16 h-16 fill-current">
            <path
              class="heroicon-ui"
              d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-9h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 2 0v2z" />
          </svg>
          Add New Equipment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from '~/components/RadialProgressBar';

export default {
  name: 'HomePage',
  components: {
    RadialProgressBar,
  },
};
</script>
