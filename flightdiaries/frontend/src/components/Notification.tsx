interface NotificationProps {
  notification: string;
}

const Notification = ({ notification }: NotificationProps) => {
  return <div>{notification && <p>{notification}</p>}</div>;
};

export default Notification;
