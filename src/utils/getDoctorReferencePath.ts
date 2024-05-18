export const getDoctorReferencePath = (userId: string, docId: string) => {
  return `users/${userId}/doctors/${docId}`
}
