import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function About() {
  const router = useRouter();

  const [activeSections, setActiveSections] = useState([]);

  const toggleSection = (section) => {
    setActiveSections((prevActiveSections) =>
      prevActiveSections.includes(section)
        ? prevActiveSections.filter((sec) => sec !== section)
        : [...prevActiveSections, section]
    );
  };

  const sections = [
    {
      title: "About Our App",
      content:
        "Welcome to [App Name], your ultimate companion for exploring and deepening your knowledge of Hindu Dharma. Our app offers a comprehensive collection of spiritual resources designed to enrich your spiritual journey.",
    },
    {
      title: "Our Purpose",
      content:
        "At [App Name], our mission is to provide a convenient and accessible platform for individuals to connect with their faith and explore the rich traditions of Hinduism. We aim to bring the timeless wisdom and spiritual practices of Hindu Dharma to your fingertips.",
    },
    {
      title: "Key Features",
      content: `Aartis: Discover a vast collection of aartis dedicated to various deities, perfect for your daily worship and special occasions.\n\nQ&A on Hindu Dharma: Find detailed answers to common questions about Hindu beliefs, practices, and philosophy.\n\nMantras: Access an extensive library of mantras for peace, prosperity, and protection, complete with meanings and chanting techniques.\n\nBhajans: Enjoy a diverse array of famous bhajans sung by renowned Saints, allowing you to connect with your faith through music.`,
    },
    {
      title: "Who Can Benefit",
      content:
        "Whether you are a devout practitioner, a curious learner, or someone seeking spiritual enrichment, [App Name] is designed for you. Our app caters to all age groups and backgrounds, offering something for everyone.",
    },
    {
      title: "How to Use",
      content:
        "Navigating our app is simple and intuitive. Use the main menu to access different sections such as Aartis, Q&A, Mantras, and Bhajans.",
    },
    {
      title: "About Us",
      content:
        "[App Name] is developed by a dedicated individual Mithil Mestry passionate about promoting spiritual knowledge and practice. For any queries or support, feel free to contact us at [contact information].",
    },
    {
      title: "Future Updates",
      content:
        "We are continuously working to enhance your experience. Stay tuned for regular updates and new content additions to further enrich your spiritual journey.",
    },
    {
      title: "Thank You for Installing Our App!",
      content:
        "We appreciate your trust in us and hope our app enhances your spiritual journey. Enjoy exploring and connecting with the divine!",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons
          name="arrow-back-outline"
          size={30}
          color="black"
          marginBottom={20}
        />
      </TouchableOpacity>

      {sections.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <TouchableOpacity
            onPress={() => toggleSection(index)}
            style={styles.header}
          >
            <Text style={styles.headerText}>{section.title}</Text>
            <Icon
              name={activeSections.includes(index) ? "angle-up" : "angle-down"}
              size={24}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <Collapsible collapsed={!activeSections.includes(index)}>
            <View style={styles.content}>
              <Text style={styles.contentText}>{section.content}</Text>
            </View>
          </Collapsible>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 25,
  },
  sectionContainer: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  content: {
    padding: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderTopWidth: 0,
  },
  contentText: {
    fontSize: 16,
  },
});
