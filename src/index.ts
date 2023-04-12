import type CardsV2 from "../@types/cards-v2";

const sample: CardsV2 = {
  cardsV2: [
    {
      cardId: "unique-card-id",
      card: {
        header: {
          title: "Sasha",
          subtitle: "Software Engineer",
          imageUrl: "https://developers.google.com/chat/images/quickstart-app-avatar.png",
          imageType: "CIRCLE",
          imageAltText: "Avatar for Sasha",
        },
        sections: [
          {
            header: "Contact Info",
            collapsible: true,
            uncollapsibleWidgetsCount: 1,
            widgets: [
              {
                decoratedText: {
                  startIcon: {
                    knownIcon: "EMAIL",
                  },
                  text: "sasha@example.com",
                },
              },
              {
                decoratedText: {
                  startIcon: {
                    knownIcon: "PERSON",
                  },
                  text: '<font color="#80e27e">Online</font>',
                },
              },
              {
                decoratedText: {
                  startIcon: {
                    knownIcon: "PHONE",
                  },
                  text: "+1 (555) 555-1234",
                },
              },
              {
                buttonList: {
                  buttons: [
                    {
                      text: "Share",
                      onClick: {
                        openLink: {
                          url: "https://example.com/share",
                        },
                      },
                    },
                    {
                      text: "Edit",
                      onClick: {
                        action: {
                          function: "goToView",
                          parameters: [
                            {
                              key: "viewType",
                              value: "EDIT",
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
};

fetch("<YourWebhookURL>", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(sample),
});
