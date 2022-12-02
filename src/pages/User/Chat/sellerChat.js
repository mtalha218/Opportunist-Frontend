import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

const SellerChat = () => {
  const [chatClient, setChatClient] = useState(null);
  const [user] = useState(() =>
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );

  useEffect(() => {
    const initChat = async () => {
      const client = new StreamChat(process.env.REACT_APP_CHAT_API_KEY);
      // open the WebSocket connection to start receiving events
      await client.connectUser(
        {
          id: user?.username,
          name: user?.username,
          image: user?.profileImg,
        },
        client.devToken(user?.username)
      );
      setChatClient(client);
    };

    initChat();

    // close the WebSocket connection when component dismounts
    return () => chatClient?.disconnectUser();
  }, []);

  if (!chatClient) return null;

  const filters = {
    type: "messaging",
    members: { $in: [user?.username] },
  };
  const sort = { last_message_at: -1 };
  // const channels = chatClient.queryChannels(filters, sort);

  return (
    <Chat client={chatClient} theme={"messaging light"}>
      <ChannelList filters={filters} sort={sort} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default SellerChat;
