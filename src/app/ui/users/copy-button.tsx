'use client';

import { Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

export function ClipboardWriteButton({ copyContent }: { copyContent: string }
) {
  const clickHandler = async () => {
    try {
      await navigator.clipboard.writeText(copyContent)
    } catch (error) {
    }
  }

  return (
    <>
      <Tooltip showArrow={true} closeDelay={150} content="クリックでコピー">
        <Link
          href={`discord://-/users/273105825013432322`}
          target="_blank"
        >
          <LuExternalLink className="text-white" />
        </Link>
      </Tooltip>
    </>
  )
}