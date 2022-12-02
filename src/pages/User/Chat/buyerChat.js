import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

const BuyerChat = () => {
  const { gigOwnerName } = useParams();

  // ✅ You should disconnect user once you are done with chatClient
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [user] = useState(() =>
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );

  useEffect(() => {
    const initChat = async () => {
      const client = new StreamChat(process.env.REACT_APP_CHAT_API_KEY);
      console.log("localStorage", user);
      // open the WebSocket connection to start receiving events
      await client.connectUser(
        {
          id: user?.username,
          name: user?.username,
          image: user?.profileImg,
        },
        client.devToken(user?.username)
      );

      const clientChannel = client?.channel("messaging", {
        name: `${gigOwnerName}`,
        image:
          "https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png",
        members: [user?.username, gigOwnerName],
      });
      setChannel(clientChannel);
      setChatClient(client);
    };

    if (user) {
      console.log("initiating");
      initChat();
    }

    // close the WebSocket connection when component dismounts
    return () => chatClient?.disconnectUser();
  }, []);

  if (!chatClient || !channel) return null;

  return (
    <Chat client={chatClient} theme={"messaging light"}>
      <Channel channel={channel}>
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

export default BuyerChat;
