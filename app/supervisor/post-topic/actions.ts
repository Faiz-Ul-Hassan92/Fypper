"use server"

import { revalidatePath } from "next/cache"

// Types for our server actions
type TopicData = {
  title: string
  type: string
  department: string
  duration: string
  description: string
  prerequisites: string
  keywords: string[]
  maxStudents: string
}

// Create a new FYP topic
export async function createTopic(data: TopicData) {
  // In a real application, this would save to a database
  console.log("Creating new topic:", data)

  // Simulate a delay to mimic database operation
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the page to show the new topic
  revalidatePath("/supervisor/post-topic")

  return {
    success: true,
    id: `FYP${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`,
  }
}

// Save a topic as draft
export async function saveTopicDraft(data: TopicData) {
  // In a real application, this would save to a database
  console.log("Saving topic draft:", data)

  // Simulate a delay to mimic database operation
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    success: true,
    id: `FYP${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`,
  }
}

// Publish a draft topic
export async function publishTopic(topicId: string) {
  // In a real application, this would update the topic status in the database
  console.log("Publishing topic:", topicId)

  // Simulate a delay to mimic database operation
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the page to show the updated topic
  revalidatePath("/supervisor/post-topic")

  return { success: true }
}

// Close applications for a topic
export async function closeApplications(topicId: string) {
  // In a real application, this would update the topic status in the database
  console.log("Closing applications for topic:", topicId)

  // Simulate a delay to mimic database operation
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the page to show the updated topic
  revalidatePath("/supervisor/post-topic")

  return { success: true }
}

// Reopen applications for a topic
export async function reopenApplications(topicId: string) {
  // In a real application, this would update the topic status in the database
  console.log("Reopening applications for topic:", topicId)

  // Simulate a delay to mimic database operation
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the page to show the updated topic
  revalidatePath("/supervisor/post-topic")

  return { success: true }
}

// Delete a topic
export async function deleteTopic(topicId: string) {
  // In a real application, this would delete the topic from the database
  console.log("Deleting topic:", topicId)

  // Simulate a delay to mimic database operation
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the page to show the updated topics list
  revalidatePath("/supervisor/post-topic")

  return { success: true }
}

