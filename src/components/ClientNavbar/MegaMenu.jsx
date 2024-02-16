import React from "react";
import { MegaMenu } from "primereact/megamenu";
import { link } from "joi";

export default function MegaMenuMain() {
  const items = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "Trekking",
      items: [
        [
          {
            label: "Annapurna Region",
            items: [
              {
                label: "Annapurna Base Camp Trek",
                url: "package/annapurna-base-camp-trek-12-days",
              },
            ],
          },
        ],
      ],
    },
    {
      label: "About us",
      url: "/aboutUs",
    },
    // {
    //   label: "Trekking",
    //   items: [
    //     [
    //       {
    //         label: "Everest Region",
    //         items: [
    //           { label: "Everest Base Camp Trek - 14 Days" },
    //           { label: "Everest Three Passes Trek - 21 Days" },
    //           { label: "Everest Short Base Camp Trek - 12 Days" },
    //           { label: "Everest and Gokyo Lake Trek - 19 Days" },
    //         ],
    //       },
    //       {
    //         label: "Annapuarna Region 1",
    //         items: [
    //           { label: "Annapurna Base Camp Trek - 12 Days" },
    //           { label: "Annapurna Circuit Trek - 19 Days" },
    //           { label: "Tilicho Base Camp Trek - 15 Days" },
    //         ],
    //       },
    //     ],
    //     [
    //       {
    //         label: "Annapuarna Region",
    //         items: [
    //           { label: "Annapurna Base Camp Trek - 12 Days" },
    //           // { label: "Annapurna Base Camp Trek - 12 Days" },
    //         ],
    //       },
    //     ],

    //     [
    //       {
    //         label: "Hello Region",
    //         items: [
    //           { label: "Annapurna Base Camp Trek - 12 Days" },
    //           { label: "Annapurna Circuit Trek - 19 Days" },
    //           { label: "Tilicho Base Camp Trek - 15 Days" },
    //         ],
    //       },
    //     ],
    //   ],
    // },

    // next menu starts
    // {
    //   label: "Destination",
    //   icon: "pi pi-clock",
    //   items: [
    //     [
    //       {
    //         label: "Nepal",
    //         items: [
    //           { label: "Trekking" },
    //           { label: "Tour" },
    //           { label: "Helicopter Tour" },
    //           { label: "Hiking" },
    //         ],
    //       },
    //     ],
    //     [
    //       {
    //         label: "Running",
    //         items: [
    //           { label: "Accessories" },
    //           { label: "Shoes" },
    //           { label: "T-Shirts" },
    //           { label: "Shorts" },
    //         ],
    //       },
    //     ],
    //     [
    //       {
    //         label: "Swimming",
    //         items: [
    //           { label: "Kickboard" },
    //           { label: "Nose Clip" },
    //           { label: "Swimsuits" },
    //           { label: "Paddles" },
    //         ],
    //       },
    //     ],
    //     [
    //       {
    //         label: "Tennis",
    //         items: [
    //           { label: "Balls" },
    //           { label: "Rackets" },
    //           { label: "Shoes" },
    //           { label: "Training" },
    //         ],
    //       },
    //     ],
    //   ],
    // },
  ];

  return (
    <div className="">
      <MegaMenu model={items} breakpoint="960px" />
    </div>
  );
}
