// components/NotificationPopover.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { BellDot } from "lucide-react";
import InfiniteScroll from "@components/InfiniteScroll";
import { Loader } from "@components/ui/Loader";
import { useNotificationStore } from "@store/notification";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@lib/request";
import { NotificationsApiProps } from "@models/notification";
import cn from "classnames";

const PAGE_SIZE = 10;
const fetch = (url: string) => fetcher(url).then((res) => res.data);

const NotificationPopover = () => {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const popoverRef = useRef<HTMLButtonElement>(null);
  const [unread, markReadAll] = useNotificationStore((state) => [
    state.unread,
    state.markReadAll,
  ]);

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (!isNotifyOpen) return null;
    if (previousPageData && !previousPageData.length) return null;
    return `/notification/getNotifications?page=${pageIndex}&pageSize=${PAGE_SIZE}`;
  };

  const swr = useSWRInfinite<NotificationsApiProps[]>(getKey, fetch);
  const { data } = swr;
  const notifications = data
    ? ([] as NotificationsApiProps[]).concat(...data)
    : [];

  useEffect(() => {
    const targetElement = popoverRef.current;
    if (!targetElement) {
      return;
    }
    const observer = new MutationObserver(() => {
      const isOpen = targetElement.getAttribute("aria-expanded");
      setIsNotifyOpen(isOpen === "true");
    });
    observer.observe(targetElement, { attributes: true });
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClickNotify = () => {};

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            as="div"
            ref={popoverRef}
            className={cn(
              "relative flex h-8 w-8 cursor-pointer items-center justify-center after:absolute after:bottom-0 after:left-1/2 after:-ml-[2px] after:h-1 after:w-1 after:rounded-full after:bg-gray-900 after:opacity-0 hover:after:opacity-100",
              {
                "after:opacity-100": open,
              }
            )}
            onClick={() => markReadAll()}
          ></PopoverButton>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <PopoverPanel className="absolute right-0 z-50 mt-[9px] w-80 origin-top-right overflow-hidden rounded-b bg-white shadow-lg ring-1 ring-black ring-opacity-100 focus:outline-none">
              <div className="scrollbar-light max-h-[400px] divide-y divide-gray-100 overflow-y-auto">
                <InfiniteScroll
                  swr={swr}
                  loadingIndicator={
                    <div className="flex justify-center py-2">
                      <Loader type="buckle" size={20} />
                    </div>
                  }
                  emptyContent={
                    <div className="flex flex-col items-center justify-center p-6">
                      <BellDot
                        size={24}
                        strokeWidth={1.75}
                        className="text-gray-500"
                      />
                      <div className="mt-2 text-gray-500">No notifications</div>
                    </div>
                  }
                  isReachingEnd={({ data }) =>
                    data?.[0]?.length === 0 ||
                    (data && data[data.length - 1].length < PAGE_SIZE)
                  }
                >
                  {(data) =>
                    data?.map((item, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer px-4 py-3.5 transition hover:bg-gray-50"
                        onClick={() => handleClickNotify()}
                      >
                        <img
                          className="h-6 w-6 rounded-full object-cover"
                          src={
                            item.sender?.photourl || "/images/logo-single.svg"
                          }
                          alt=""
                        />
                        <div className="mx-3 min-w-0 flex-1">
                          <div className="break-words leading-tight">
                            <span className="mr-1 font-medium">
                              {item.sender?.displayname || "CrowdCore"}
                            </span>
                            {item.title}
                          </div>
                          {item?.desc && item.desc.length > 0 && (
                            <div className="ellipsis-2 mt-1 text-xs text-gray-600">
                              {item.desc}
                            </div>
                          )}
                        </div>
                        {item.count > 1 && (
                          <div className="text-xs leading-5 text-gray-500">
                            + {item.count}
                          </div>
                        )}
                      </div>
                    ))
                  }
                </InfiniteScroll>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default NotificationPopover;
