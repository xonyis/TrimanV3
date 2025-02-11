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
  orehgi
</main>
</template>

<style scoped>
main {
  width: 100%;
  color: whitesmoke;

}
</style>