import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  FlatList,
  ScrollView
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useSelector } from "react-redux";
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";
import comments from "../../../db/Comments";
import UserComment from "./UserComment";

const { width } = Dimensions.get("window");

export const Comments = () => {
  const user = useSelector((state) => state.auth.user);
  const [textComment, setTextComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  // Toggle hiển thị tất cả bình luận
  const handleShowMore = () => setShowAllComments(!showAllComments);

  // Chỉ hiển thị 4 comment đầu nếu chưa bấm "Xem thêm"
  const displayedComments = showAllComments ? comments : comments.slice(0, 4);

  return (
    <View style={styles.commentContainer}>
      <CustomText style={styles.title}>Bình luận</CustomText>
      <CustomText style={styles.commentCount}>{comments.length}</CustomText>

      {/* Input nhập bình luận */}
      {Object.keys(user).length !== 0 && (
        <View style={styles.inputContainer}>
          <Image
            style={styles.profilePic}
            source={
              user.profilePicture?.length === 0
                ? require("../../../assets/images/defaultprofile.jpg")
                : { uri: user.profilePicture }
            }
          />
          <TextInput
            placeholder="Thêm bình luận công khai..."
            style={styles.input}
            onChangeText={setTextComment}
          />
          <Entypo
            name="paper-plane"
            size={25}
            color={textComment.length === 0 ? Colors.grey : Colors.blue}
          />
        </View>
      )}

      {/* Danh sách bình luận */}
      <FlatList
        data={displayedComments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserComment comment={item} />}
        nestedScrollEnabled = {true}
      />

      {/* Nút xem thêm */}
      {comments.length > 4 && (
        <TouchableOpacity onPress={handleShowMore} style={styles.showMoreButton}>
          <CustomText style={styles.showMoreText}>
            {showAllComments ? "Ẩn bớt" : "Xem thêm"}
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.light_grey,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  commentCount: {
    fontSize: 15,
    marginLeft: 10,
    color: Colors.grey,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    paddingVertical: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    backgroundColor: Colors.light_grey,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  showMoreButton: {
    alignSelf: "center",
    paddingVertical: 10,
  },
  showMoreText: {
    fontSize: 14,
    color: Colors.blue,
    fontWeight: "bold",
  },
});
