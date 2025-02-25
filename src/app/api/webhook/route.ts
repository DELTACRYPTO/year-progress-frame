import { sendFrameNotification } from "@/lib/notifications";
import {
  ParseWebhookEvent,
  parseWebhookEvent,
  verifyAppKeyWithNeynar,
} from "@farcaster/frame-node";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const requestJson = await request.json();

  let data;
  try {
    data = await parseWebhookEvent(requestJson, verifyAppKeyWithNeynar);
  } catch (e: unknown) {
    const error = e as ParseWebhookEvent.ErrorType;

    switch (error.name) {
      case "VerifyJsonFarcasterSignature.InvalidDataError":
      case "VerifyJsonFarcasterSignature.InvalidEventDataError":
        // The request data is invalid
        return Response.json(
          { success: false, error: error.message },
          { status: 400 }
        );
      case "VerifyJsonFarcasterSignature.InvalidAppKeyError":
        // The app key is invalid
        return Response.json(
          { success: false, error: error.message },
          { status: 401 }
        );
      case "VerifyJsonFarcasterSignature.VerifyAppKeyError":
        // Internal error verifying the app key (caller may want to try again)
        return Response.json(
          { success: false, error: error.message },
          { status: 500 }
        );
    }
  }

  const fid = data.fid;
  const event = data.event;

  switch (event.event) {
    case "frame_added":
      if (event.notificationDetails) {
        // TODO: Get user
        const user = null;
        if (!user) {
          // TODO: Create user
        } else {
          // TODO: Set user notification details
        }
        await sendFrameNotification({
          fid,
          title: "Welcome to Year Progress 🔄",
          body: "Make every day count!",
        });
      } else {
        // TODO: Delete user notification details
      }
      // TODO: Track event
      break;
    case "frame_removed":
      // TODO: Delete user notification details
      // TODO: Track event
      break;
    case "notifications_enabled":
      // TODO: Set user notification details
      // TODO: Send frame notification
      await sendFrameNotification({
        fid,
        title: "Ding ding ding",
        body: "Notifications for Year Progress are now enabled",
      });
      // TODO: Track event
      break;
    case "notifications_disabled":
      // TODO: Delete user notification details
      // TODO: Track event
      break;
  }

  return Response.json({ success: true });
}
