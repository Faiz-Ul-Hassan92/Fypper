"use server"

import { revalidatePath } from "next/cache"

type ReferenceData = {
  studentId: string
  rating: number
  skills?: string[]
  recommendationLetter: string
}

export async function submitReference(data: ReferenceData) {
  // In a real application, you would save this to your database
  console.log("Submitting reference:", data)

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the page to show updated data
  revalidatePath("/supervisor/give-reference")

  return { success: true }
}

export async function saveReferenceDraft(data: ReferenceData) {
  // In a real application, you would save this draft to your database
  console.log("Saving reference draft:", data)

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return { success: true }
}

export async function searchStudent(query: string) {
  // In a real application, you would query your database
  console.log("Searching for student:", query)

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock student data
  return {
    id: "STU-2023-0042",
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    program: "Computer Science",
    year: "Final Year",
    gpa: "3.8/4.0",
    image: "/placeholder.svg?height=200&width=200",
  }
}

export async function getPreviousReferences() {
  // In a real application, you would fetch this data from your database
  // This is mock data for demonstration
  const references = [
    {
      id: "1",
      studentId: "1",
      studentName: "John Smith",
      department: "Computer Science",
      rating: 9,
      date: "2023-03-15",
      recommendationLetter: "John is an exceptional student with strong analytical skills and a great work ethic.",
    },
    {
      id: "2",
      studentId: "4",
      studentName: "Emily Chen",
      department: "Data Science",
      rating: 10,
      date: "2023-01-22",
      recommendationLetter:
        "Emily demonstrates outstanding problem-solving abilities and leadership qualities. She consistently delivers high-quality work.",
    },
    {
      id: "3",
      studentId: "2",
      studentName: "Michael Brown",
      department: "Software Engineering",
      rating: 8,
      date: "2022-11-10",
      recommendationLetter:
        "Michael has shown great dedication to his studies and has excellent technical skills in software engineering.",
    },
  ]

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return references
}

