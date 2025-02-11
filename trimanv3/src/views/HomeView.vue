<script>
export default {
  data() {
    return {
      nbrPlayers: 2,
      otp: ['','','','']
    }
  },
  methods: {
    addPlayer() {
      this.nbrPlayers = this.nbrPlayers+1;
      if (this.nbrPlayers > 8) {
        this.nbrPlayers = 8
      }
    },
    remPlayer() {
      this.nbrPlayers = this.nbrPlayers-1;
      if (this.nbrPlayers < 2) {
        this.nbrPlayers = 2
      }
    },
    handleKeyDown(event, index) {
      if (
          !/^[0-9]{1}$/.test(event.key) &&
          event.key !== "Backspace" &&
          event.key !== "Delete" &&
          event.key !== "Tab" &&
          !event.metaKey
      ) {
        event.preventDefault();
      }

      if (event.key === "Delete" || event.key === "Backspace") {
        if (index > 0) {
          this.otp[index] = "";
          this.$refs.otpInputs[index - 1].focus();
        }
      }
    },
    handleInput(event, index) {
      if (event.target.value) {
        if (index < this.otp.length - 1) {
          this.$refs.otpInputs[index + 1].focus();
        }
      }
    },
    handleFocus(index) {
      this.$refs.otpInputs[index].select();
    },
    handlePaste(event) {
      event.preventDefault();
      const text = event.clipboardData.getData("text");

      if (!new RegExp(`^[0-9]{${this.otp.length}}$`).test(text)) {
        return;
      }

      const digits = text.split("");
      this.otp = digits.slice(0, this.otp.length);
      this.$refs.submitButton.focus();
    },
    submitOTP() {
      alert("Code OTP soumis : " + this.otp.join(""));
    },
  }
}
</script>

<template>
  <main class="bg-zinc-800 flex items-center w-full flex-col p-5">
    <h2 class="text-4xl">TRIMAN</h2>

    <div class="border rounded-2xl p-5 bg-zinc-100 text-zinc-800 w-full block shadow-xl shadow-black/50 !mt-5">
      <h3 class="text-2xl text-center !mt-1">Créer une partie !</h3>
      <form class="!mt-4">
        <label class="text-xl !leading-none">Nombre de joueurs :</label><br>
        <span class="text-zinc-500 text-xs block !mt-0">(min : 2, max : 8)</span>
        <div class="flex items-center justify-center !mt-5">
          <button id="decrement-btn" @click.prevent="remPlayer"
                  class="flex justify-center items-center w-7 h-7 rounded-full text-white focus:outline-none bg-gray-400 hover:bg-gray-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
            </svg>
          </button>
          <span id="counter" class="text-3xl p-0 font-bold !mx-4 !mt-2">{{nbrPlayers}}</span>
          <button id="increment-btn" @click.prevent="addPlayer"
                  class="flex justify-center items-center w-7 h-7 rounded-full text-white focus:outline-none bg-indigo-500 hover:bg-indigo-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12M6 12h12"></path>
            </svg>
          </button>
        </div>
        <div class="flex justify-center !mt-5">
          <button class="!mx-auto px-5 py-2 !leading-none rounded-lg bg-indigo-500 text-zinc-100 text-xl"><span class="leading-none block !mt-2">Créer</span></button>

        </div>
      </form>

    </div>

    <div class="border rounded-2xl p-5 bg-zinc-100 text-zinc-800 w-full block shadow-xl shadow-black/50 !mt-5">
      <h3 class="text-2xl text-center !mt-1">Rejoindre une partie !</h3>
      <form class="!mt-4" @submit.prevent="submitOTP">
        <label class="text-xl !leading-none">Code de la game :</label><br>
        <div class="flex items-center justify-center !mt-2 !mb-6">

          <div class="flex items-center justify-center gap-3">
            <input
                v-for="(value, index) in otp"
                :key="index"
                ref="otpInputs"
                type="text"
                v-model="otp[index]"
                class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border  border-indigo-300 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxlength="1"
                @input="handleInput($event, index)"
                @keydown="handleKeyDown($event, index)"
                @focus="handleFocus(index)"
                @paste="handlePaste"
            />
          </div>
        </div>
        <div class="flex justify-center !mt-5">
          <button class="!mx-auto px-5 py-2 !leading-none rounded-lg bg-indigo-500 text-zinc-100 text-xl">
            <span class="leading-none block !mt-2">Rejoindre</span>
          </button>
        </div>
      </form>

    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  color: whitesmoke;

}
</style>