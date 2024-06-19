import db from "@/lib/db";

export async function SwitchTwoFactor(email: string, isTwoFactorEnabled: boolean) {
  try {
    const updatedUser = await db.user.update({
      where: {
        email: email,
      },
      data: {
        isTwoFactorEnabled,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Ошибка при обновлении статуса:", error);
    throw error;
  }
}
