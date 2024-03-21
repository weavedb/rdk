FROM envoyproxy/envoy-alpine:v1.21.6
RUN apk add vim zsh curl
COPY envoy-local.yaml /etc/envoy/envoy-local.yaml

CMD ["/usr/local/bin/envoy", "-c /etc/envoy/envoy-local.yaml" ]
