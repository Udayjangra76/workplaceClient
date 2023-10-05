import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {">"} John Doe {">"}
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
