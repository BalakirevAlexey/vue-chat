<template>
  <main class="current-chat">
    <template v-if="!selectedChatId">
      <NoSelectedChat />
    </template>
    <template v-else>
      <ChatMessages
        :messages="currentChatMessages"
        :current-user-id="user._id"
      />
      <ChatMessageForm
        :is-join="isUserJoinSelectedChat"
        @joinChat="onJoinChat"
      />
    </template>
  </main>
</template>

<script>
import Emitters from "@/plugins/socket/emitters";

import NoSelectedChat from "../components/NoSelectedChat.vue";
import ChatMessages from "../components/ChatMessages.vue";
import ChatMessageForm from "../components/ChatMessageForm.vue";

import { mapGetters } from "vuex";
export default {
  name: "CurrentChat",
  components: { NoSelectedChat, ChatMessages, ChatMessageForm },
  computed: {
    ...mapGetters("chats", ["selectedChatId", "currentChatMessages"]),
    ...mapGetters("user", ["user", "fullName"]),
    isUserJoinSelectedChat() {
      return this.user.chats.includes(this.selectedChatId);
    },
  },
  methods: {
    onJoinChat() {
      this.$socket.emit(Emitters.JOIN_CHAT, {
        chatId: this.selectedChatId,
        userName: this.fullName,
        userId: this.user._id,
      });
    },
  },
};
</script>
<style scoped>
.current-chat {
  background-color: #fdfcfe;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
}
</style>
