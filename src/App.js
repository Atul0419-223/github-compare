import React, { useState, useEffect } from "react";
import GithubForm from "./github";
import { Card } from "antd";
import styled from "styled-components";
import Footer from "./layout/Footer"
import { PageHeader } from 'antd';
import './index.css'
const Wrapper = styled.div`
  display:flex;
  margin: -1rem;
`;

function App() {
  const [users, setUser] = useState(null);

  useEffect(() => {
    const { search } = window.location;
    const usernamesTmp = search.split("?usernames=");
    const usernames = usernamesTmp[usernamesTmp.length - 1].split(",");
    const allUserData = [];
    usernames.forEach(async (username) => {
      await fetchUsers(username);
    });
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const pageUrl = `?usernames=${Object.keys(JSON.parse(storedUsers)).join(
          ","
        )}`;
        window.history.pushState("", "", pageUrl);
        setUser(JSON.parse(storedUsers));
      }
    };

    getUsers();
  }, []);

  const fetchUsers = async (username) => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (res.status === 200) {
        const userData = await res.json();
        const storedUsers = await localStorage.getItem("users");
        if (storedUsers) {
          const newStoredUsers = Object.assign({}, JSON.parse(storedUsers), {
            [username]: userData,
          });
          setUser(newStoredUsers);
          localStorage.setItem("users", JSON.stringify(newStoredUsers));
          const pageUrl = `?usernames=${Object.keys(newStoredUsers).join(",")}`;
          window.history.pushState("", "", pageUrl);
        } else {
          setUser({ [username]: userData });
          localStorage.setItem(
            "users",
            JSON.stringify({ [username]: userData })
          );
          const pageUrl = `?usernames=${username}`;
          window.history.pushState("", "", pageUrl);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sortedUser = () => {
    let sortedUser = [];
    if (users && typeof users === "object") {
      for (const user in users) {
        sortedUser.push(users[user]);
      }
    }
    sortedUser.sort((a, b) => b.public_repos - a.public_repos);
    sortedUser.sort((c,d) => d.public_gists - c.public_gists);
    return sortedUser;
  };

  return (
    
    <div>
      <PageHeader
    className="site-page-header"
    onBack={() => null}
    title="BoardInfinity"
    subTitle="GITHUB PROFILE COMPARE"
  />,
      
      <Wrapper>
        {users &&
          sortedUser().map((user) => (
            <Card key={user.id} title={user.login} style={{ width: 300 }}>
            <img src={user.avatar_url} className="img-thumbnail" style={{height:150,width:150}} />
              <p>Public Repos: {user.public_repos}</p>
              <p>Followers: {user.followers}</p>
              <p>Following: {user.following}</p>
              <p>Public Gists:{user.public_gists} </p>
            </Card>
            
          ))}
      </Wrapper>
      
      <GithubForm onSubmit={fetchUsers} />
      <Footer />
    </div>
    
  );
}

export default App;
