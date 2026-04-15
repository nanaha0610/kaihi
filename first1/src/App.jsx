import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("1年");
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem("members");
    return savedMembers ? JSON.parse(savedMembers) : [];
  });
  const [eventName, setEventName] = useState(() => {
    return localStorage.getItem("eventName") || "";
    });
  const prices = {
    "1年": 2000,
    "2年": 4000,
    "3年": 5000,
    "4年": 5000,
  };

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);
  useEffect(() => {
  localStorage.setItem("eventName", eventName);
  }, [eventName]);
  const addMember = () => {
    if (name === "") {
      return;
    }

    const newMember = {
      id: Date.now(),
      name: name,
      grade: grade,
      price: prices[grade],
      paid: false,
    };

    setMembers([...members, newMember]);
    setName("");
    setGrade("1年");
  };

  const togglePaid = (id) => {
    const newMembers = members.map((member) => {
      if (member.id === id) {
        return { ...member, paid: !member.paid };
      } else {
        return member;
      }
    });

    setMembers(newMembers);
  };

  const deleteMember = (id) => {
    const newMembers = members.filter((member) => member.id !== id);
    setMembers(newMembers);
  };
  const clearAllMembers = () => {
    const result = window.confirm("本当に全員消しますか？");

    if (result) {
      setMembers([]);
    }
  };

  const totalAmount = members.reduce((sum, member) => sum + member.price, 0);

  const paidAmount = members.reduce((sum, member) => {
    if (member.paid) {
      return sum + member.price;
    } else {
      return sum;
    }
  }, 0);

  const unpaidAmount = totalAmount - paidAmount;

  const firstYearMembers = members.filter((member) => member.grade === "1年");
const secondYearMembers = members.filter((member) => member.grade === "2年");
const thirdYearMembers = members.filter((member) => member.grade === "3年");
const fourthYearMembers = members.filter((member) => member.grade === "4年");

const firstYearTotal = firstYearMembers.reduce(
  (sum, member) => sum + member.price,
  0
);
const secondYearTotal = secondYearMembers.reduce(
  (sum, member) => sum + member.price,
  0
);
const thirdYearTotal = thirdYearMembers.reduce(
  (sum, member) => sum + member.price,
  0
);
const fourthYearTotal = fourthYearMembers.reduce(
  (sum, member) => sum + member.price,
  0
);
  
  return (
    <div className="app">
      <h1 className="title">会費集計</h1>
      <div className="event-name-box">
        <input
          className="input"
          type="text"
          placeholder="イベント名を入力"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />  
      </div>
      <div className="form">
        <input
          className="input"
          type="text"
          placeholder="名前を入力"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="select"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="1年">1年</option>
          <option value="2年">2年</option>
          <option value="3年">3年</option>
          <option value="4年">4年</option>
        </select>

        <button className="add-button" onClick={addMember}>
          追加
        </button>
        <button className="clear-button" onClick={clearAllMembers}>
          全消去
        </button>
      </div>

      <div className="grade-box">
        <h2>1年（{firstYearMembers.length}人 / {firstYearTotal}円）</h2>
        <ul>
          {firstYearMembers.map((member) => (
          <li className="member-item" key={member.id}>
            <span>
              {member.name}（{member.grade}）- {member.price}円 -{" "}
              {member.paid ? "支払い済み" : "未払い"}
            </span>
            <div>
              <button onClick={() => togglePaid(member.id)}>切り替え</button>
              <button onClick={() => deleteMember(member.id)}>削除</button>
            </div>
          </li>
          ))}
        </ul>
      </div>

      <div className="grade-box">
        <h2>2年（{secondYearMembers.length}人 / {secondYearTotal}円）</h2>
        <ul>
          {secondYearMembers.map((member) => (
          <li className="member-item" key={member.id}>
            <span>
              {member.name}（{member.grade}）- {member.price}円 -{" "}
              {member.paid ? "支払い済み" : "未払い"}
            </span>
            <div>
              <button onClick={() => togglePaid(member.id)}>切り替え</button>
              <button onClick={() => deleteMember(member.id)}>削除</button>
            </div>
          </li>
          ))}
        </ul>
      </div>

      <div className="grade-box">
        <h2>3年（{thirdYearMembers.length}人 / {thirdYearTotal}円）</h2>
        <ul>
          {thirdYearMembers.map((member) => (
          <li className="member-item" key={member.id}>
            <span>
                {member.name}（{member.grade}）- {member.price}円 -{" "}
                {member.paid ? "支払い済み" : "未払い"}
            </span>
            <div>
              <button onClick={() => togglePaid(member.id)}>切り替え</button>
              <button onClick={() => deleteMember(member.id)}>削除</button>
            </div>
          </li>
          ))}
        </ul>
      </div>

      <div className="grade-box">
        <h2>4年（{fourthYearMembers.length}人 / {fourthYearTotal}円）</h2>
        <ul>
          {fourthYearMembers.map((member) => (
          <li className="member-item" key={member.id}>
            <span>
                {member.name}（{member.grade}）- {member.price}円 -{" "}
                {member.paid ? "支払い済み" : "未払い"}
            </span>
            <div>
              <button onClick={() => togglePaid(member.id)}>切り替え</button>
              <button onClick={() => deleteMember(member.id)}>削除</button>
            </div>
          </li>
          ))}
        </ul>
      </div>

      <div className="total-box">
        <h2>合計</h2>
        <p>合計金額：{totalAmount}円</p>
        <p>回収済み：{paidAmount}円</p>
        <p>残り：{unpaidAmount}円</p>
      </div>
    </div>
  );
}

export default App;