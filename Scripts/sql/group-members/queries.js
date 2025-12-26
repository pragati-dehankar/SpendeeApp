export const GROUP_MEMBER_QUERY=`
INSERT INTO group_members (group_id,user_id)
VALUES(?,?)
`;

export const GET_ALL_GROUP_MEMBERS_BY_ID=`
SELECT * FROM group_members 
WHERE group_id=?
`