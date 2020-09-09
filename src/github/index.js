import React, { useState } from "react";
import { Button, Input } from "antd";
import styled from "styled-components";
import { AudioOutlined } from '@ant-design/icons';
const Wrapper = styled.div`
  display:flex;
`;
const GithubForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");

  const handleClick = async (event) => {
    event.preventDefault();
    await onSubmit(username);
    setUsername("");
  };
  
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
  
  return (
    <Wrapper>
      <Input
        type="text"
        suffix={suffix}
        value={username}
        onChange={({ target }) => setUsername(target.value.toLowerCase())}
        placeholder="GitHub username"
        required
      />
      <Button onClick={handleClick} style={{color:'#01CBC6',hover:'#01CBC6'}}>Compare</Button>
    </Wrapper>
  );
};

export default GithubForm;
