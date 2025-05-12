interface TeamCardProps {
  teamNumber: number;
  teamColor: "blue" | "green";
  members: string[];
}

export default function TeamCard({ teamNumber, teamColor, members }: TeamCardProps) {
  const bgColor = teamColor === "blue" ? "bg-blue-50" : "bg-green-50";
  const borderColor = teamColor === "blue" ? "border-blue-200" : "border-green-200";
  const textColor = teamColor === "blue" ? "text-blue-700" : "text-green-700";
  const itemBorderColor = teamColor === "blue" ? "border-blue-100" : "border-green-100";

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4`}>
      <h2 className={`text-xl font-semibold ${textColor} mb-3`}>
        Team {teamNumber}
      </h2>
      <ul className="space-y-2">
        {members.map((member, index) => (
          <li 
            key={index} 
            className={`bg-white rounded-md p-3 shadow-sm border ${itemBorderColor}`}
          >
            {member}
          </li>
        ))}
      </ul>
    </div>
  );
}
